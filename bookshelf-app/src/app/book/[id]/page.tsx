// src/app/book/[id]/page.tsx
import { coverUrl } from "@/lib/cover";
import { getBaseUrl } from "@/lib/utils";
import Link from "next/link";

async function fetchWork(id: string) {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/work/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Kunde inte hämta bokdetaljer");
  return res.json() as Promise<{
    id: string;
    title: string;
    description?: string;
    subjects?: string[];
    covers?: number[];
  }>;
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // 👈 vänta in params
  const w = await fetchWork(id);

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
