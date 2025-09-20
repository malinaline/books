import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const r = await fetch(`https://openlibrary.org/works/${id}.json`);
  if (!r.ok)
    return NextResponse.json({ error: "Upstream error" }, { status: r.status });

  const w = await r.json();
  const description =
    typeof w.description === "string" ? w.description : w.description?.value;

  return NextResponse.json({
    id,
    title: w.title,
    description,
    subjects: w.subjects ?? [],
    covers: w.covers ?? [],
  });
}
