import type { Context } from "@netlify/functions";

// Realtime Database "visitors" node: rules allow public writes, deny reads.
const DATABASE_URL = process.env.VITE_FIREBASE_DATABASE_URL?.replace(/\/$/, "");
const IGNORE_IPS = new Set(
  (process.env.TRACK_IGNORE_IPS ?? "").split(",").map((ip) => ip.trim()).filter(Boolean)
);

// Crawlers that run JavaScript still hit this endpoint; tag the ones that give themselves away.
const BOT_AGENT = /bot|crawl|spider|slurp|scrap|lighthouse|pagespeed|puppeteer|playwright|selenium|phantom|python|curl|wget|axios|go-http|java\//i;

function botSignal(req: Request) {
  const agent = req.headers.get("user-agent") ?? "";
  if (!agent) return "no user agent";
  if (/headless/i.test(agent)) return "headless browser";
  if (BOT_AGENT.test(agent)) return "identifies as a bot";
  if (!req.headers.get("accept-language")) return "no browser language";
  return null;
}

// POST { path, referrer } → one pushed entry under /visitors.
export default async (req: Request, context: Context) => {
  if (req.method !== "POST") return new Response(null, { status: 405 });
  if (!DATABASE_URL || IGNORE_IPS.has(context.ip)) return new Response(null, { status: 204 });

  let body: { path?: unknown; referrer?: unknown } = {};
  try { body = await req.json(); } catch { /* empty or bad body */ }
  const str = (v: unknown) => (typeof v === "string" && v ? v.slice(0, 500) : null);

  try {
    const res = await fetch(`${DATABASE_URL}/visitors.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        at: { ".sv": "timestamp" },
        time: new Date().toLocaleString("en-US", {
          timeZone: "America/Chicago",
          dateStyle: "medium",
          timeStyle: "short",
        }),
        ip: context.ip,
        city: context.geo?.city ?? null,
        region: context.geo?.subdivision?.name ?? null,
        lat: context.geo?.latitude ?? null,
        lon: context.geo?.longitude ?? null,
        referrer: str(body.referrer),
        bot: botSignal(req),
      }),
    });
    if (!res.ok) console.error("track: firebase write failed", res.status, await res.text());
  } catch (err) {
    console.error("track: firebase write failed", err);
  }
  return new Response(null, { status: 204 });
};
