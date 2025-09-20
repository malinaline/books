// src/app/book/[id]/page.tsx
import { headers } from "next/headers";
import { coverUrl } from "@/lib/cover";
import Link from "next/link";

async function fetchSearch(q: string, page: number) {
  const h = await headers(); 
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const base = `${proto}://${host}`;
  const res = await fetch(
    `${base}/api/search?q=${encodeURIComponent(q)}&page=${page}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Kunde inte hämta sökresultat");
  return res.json();
}

async function fetchWork(id: string) {
  const h = headers();
  const host = (await h).get("x-forwarded-host") ?? (await h).get("host");
  const proto = (await h).get("x-forwarded-proto") ?? "http";
  const base = `${proto}://${host}`;

  const res = await fetch(`${base}/api/work/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Kunde inte hämta bokdetaljer");
  return res.json() as Promise<{
    id: string;
    title: string;
    description?: string;
    subjects?: string[];
    covers?: number[];
  }>;
}

export default async function BookPage({ params }: { params: { id: string } }) {
  const w = await fetchWork(params.id);

  return (
    <article>
      <p>
        <Link href="/">&larr; Tillbaka</Link>
      </p>
      <h1>{w.title}</h1>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coverUrl(w.covers?.[0], "L")}
        alt=""
        style={{ maxWidth: 320, borderRadius: 12, border: "1px solid #e5e7eb" }}
      />

      {w.description && <p style={{ marginTop: 12 }}>{w.description}</p>}

      {Array.isArray(w.subjects) && w.subjects.length > 0 && (
        <ul style={{ marginTop: 12 }}>
          {w.subjects.slice(0, 12).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
