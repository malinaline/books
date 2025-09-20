import { NextResponse } from "next/server";
const TTL = 5 * 60 * 1000;
const cache = new Map<string, { ts: number; data: any }>();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const page = Number(searchParams.get("page") || "1");
  if (!q) return NextResponse.json({ error: "Missing q" }, { status: 400 });

  const key = `s:${q}:${page}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < TTL) return NextResponse.json(hit.data);

  const r = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(
      q
    )}&page=${page}`
  );
  if (!r.ok)
    return NextResponse.json({ error: "Upstream error" }, { status: r.status });
  const j = await r.json();
  const items = (j.docs || []).map((d: any) => ({
    id: (d.key || "").replace("/works/", ""),
    title: d.title,
    authors: d.author_name || [],
    year: d.first_publish_year,
    coverId: d.cover_i,
  }));
  const data = { page, pageSize: 20, total: j.numFound || items.length, items };
  cache.set(key, { ts: Date.now(), data });
  return NextResponse.json(data);
}
