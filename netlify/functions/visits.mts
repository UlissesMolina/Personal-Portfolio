import { getStore } from "@netlify/blobs";

const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
const KEY = "count";

// GET → current count. POST → count + 1 (retried on conflicting writes).
export default async (req: Request) => {
  try {
    const store = getStore({ name: "visits", consistency: "strong" });

    for (let attempt = 0; attempt < 5; attempt++) {
      const entry = await store.getWithMetadata(KEY, { type: "json" });
      const count: number = entry?.data ?? 0;
      if (req.method !== "POST") {
        return new Response(JSON.stringify({ count }), { headers });
      }

      const next = count + 1;
      const { modified } = entry
        ? await store.setJSON(KEY, next, { onlyIfMatch: entry.etag })
        : await store.setJSON(KEY, next, { onlyIfNew: true });
      if (modified) return new Response(JSON.stringify({ count: next }), { headers });
    }
  } catch {
    // fall through
  }
  return new Response(JSON.stringify({ count: null }), { headers });
};
