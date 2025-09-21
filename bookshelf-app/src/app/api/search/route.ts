// src/app/api/search/route.ts
import { NextResponse } from "next/server";

const TTL = 5 * 60 * 1000;
const cache = new Map<string, { ts: number; data: any }>();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const page = Number(searchParams.get("page") || "1") || 1;

  if (!q) return NextResponse.json({ error: "Missing q" }, { status: 400 });

  const key = `s:${q}:${page}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < TTL) {
    return NextResponse.json(hit.data);
  }

  try {
    const url = new URL("https://openlibrary.org/search.json");
    url.searchParams.set("q", q);
    url.searchParams.set("page", String(page));

    const r = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "Bokhyllan/1.0" },
      // timeout ~8s (Node 18.17+)
      // @ts-ignore
      signal:
        typeof AbortSignal !== "undefined" && "timeout" in AbortSignal
          ? AbortSignal.timeout(8000)
          : undefined,
    });

    if (!r.ok) {
      return NextResponse.json(
        { error: `Upstream error (${r.status})` },
        { status: 502 }
      );
    }

    const j = await r.json();
    const items = (j.docs || []).map((d: any) => ({
      id: String(d.key || "").replace("/works/", ""),
      title: d.title,
      authors: d.author_name || [],
      year: d.first_publish_year,
      coverId: d.cover_i,
    }));

    const data = {
      page,
      pageSize: 20,
      total: j.numFound || items.length,
      items: items.slice(0, 20),
    };

    cache.set(key, { ts: Date.now(), data });
    return NextResponse.json(data);
  } catch {
    // Timeout/nätverksfel mot Open Library
    return NextResponse.json(
      { error: "Upstream timeout or network error" },
      { status: 504 }
    );
  }
}
