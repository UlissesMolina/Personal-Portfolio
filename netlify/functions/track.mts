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

const VISIT_ID = /^[-_A-Za-z0-9]{20}$/;
const VISITOR_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const str = (v: unknown, max = 500) => (typeof v === "string" && v ? v.slice(0, max) : null);

// POST { visit, href, label } → one click under /visitors/<visit>/clicks.
async function logClick(body: Record<string, unknown>) {
  const href = str(body.href);
  if (typeof body.visit !== "string" || !VISIT_ID.test(body.visit) || !href) return;
  const res = await fetch(`${DATABASE_URL}/visitors/${body.visit}/clicks.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ at: { ".sv": "timestamp" }, href, label: str(body.label, 120) }),
  });
  if (!res.ok) console.error("track: click write failed", res.status, await res.text());
}

// POST { path, referrer, visitor } → one pushed entry under /visitors; responds with its { id } for later clicks.
export default async (req: Request, context: Context) => {
  if (req.method !== "POST") return new Response(null, { status: 405 });
  if (!DATABASE_URL || IGNORE_IPS.has(context.ip)) return new Response(null, { status: 204 });

  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* empty or bad body */ }

  if (body.type === "click") {
    try { await logClick(body); } catch (err) { console.error("track: click write failed", err); }
    return new Response(null, { status: 204 });
  }

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
        visitor: typeof body.visitor === "string" && VISITOR_ID.test(body.visitor) ? body.visitor : null,
        bot: botSignal(req),
      }),
    });
    if (!res.ok) {
      console.error("track: firebase write failed", res.status, await res.text());
    } else {
      const { name } = await res.json();
      if (typeof name === "string") return Response.json({ id: name });
    }
  } catch (err) {
    console.error("track: firebase write failed", err);
  }
  return new Response(null, { status: 204 });
};
