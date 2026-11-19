import type { Context } from "@netlify/functions";

// Realtime Database "clicks" node: rules allow public writes, deny reads.
const DATABASE_URL = process.env.VITE_FIREBASE_DATABASE_URL?.replace(/\/$/, "");
const IGNORE_IPS = new Set(
  (process.env.TRACK_IGNORE_IPS ?? "").split(",").map((ip) => ip.trim()).filter(Boolean)
);

// POST { path, referrer } → one pushed entry under /clicks.
export default async (req: Request, context: Context) => {
  if (req.method !== "POST") return new Response(null, { status: 405 });
  if (!DATABASE_URL || IGNORE_IPS.has(context.ip)) return new Response(null, { status: 204 });

  let body: { path?: unknown; referrer?: unknown } = {};
  try { body = await req.json(); } catch { /* empty or bad body */ }
  const str = (v: unknown) => (typeof v === "string" && v ? v.slice(0, 500) : null);

  try {
    const res = await fetch(`${DATABASE_URL}/clicks.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        at: { ".sv": "timestamp" },
        ip: context.ip,
        city: context.geo?.city ?? null,
        region: context.geo?.subdivision?.name ?? null,
        country: context.geo?.country?.name ?? null,
        path: str(body.path),
        referrer: str(body.referrer),
        userAgent: req.headers.get("user-agent"),
      }),
    });
    if (!res.ok) console.error("track: firebase write failed", res.status, await res.text());
  } catch (err) {
    console.error("track: firebase write failed", err);
  }
  return new Response(null, { status: 204 });
};
