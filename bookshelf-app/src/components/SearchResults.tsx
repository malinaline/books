// src/components/SearchResults.tsx
import BookCard from "@/components/BookCard";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import { getBaseUrl } from "@/lib/utils";

type BookItem = {
  id: string;
  title: string;
  authors: string[];
  year?: number;
  coverId?: number;
};

type SearchResponse = {
  page: number;
  pageSize: number;
  total: number;
  items: BookItem[];
};

export default async function SearchResults({
  q,
  page,
}: {
  q: string;
  page: number;
}) {
  const base = await getBaseUrl();

  // 🔸 Dev: gör fallbacken (ResultsSkeleton) synlig
  if (process.env.NODE_ENV === "development") {
    await new Promise((r) => setTimeout(r, 1000)); // 1s
  }

  const fetchOpts =
    process.env.NODE_ENV === "development"
      ? ({ cache: "no-store" } as const) // dev: tvinga ny fetch varje gång
      : ({ next: { revalidate: 30 } } as const); // prod: rimlig cache

  let res: Response;
  try {
    res = await fetch(
      `${base}/api/search?q=${encodeURIComponent(q)}&page=${page}`,
      fetchOpts
    );
  } catch {
    return (
      <EmptyState message="Nätverksfel. Kontrollera anslutningen och försök igen." />
    );
  }

  if (!res.ok) {
    return (
      <EmptyState message="Kunde inte hämta sökresultat just nu. Prova igen strax." />
    );
  }

  const data = (await res.json()) as SearchResponse;

  if (!Array.isArray(data.items) || data.items.length === 0) {
    return <EmptyState message={`Hoppsan! Inga träffar för “${q}”.`} />;
  }

  return (
    <>
      {/* Skärmläsarhint om antal träffar */}
      <p className="sr-only" aria-live="polite">
        Visar {Math.min(data.pageSize, data.items.length)} av {data.total}{" "}
        träffar för “{q}”.
      </p>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((b) => (
          <BookCard key={b.id} {...b} />
        ))}
      </div>

      <div className="mt-4">
        <Pagination
          total={data.total}
          page={data.page}
          pageSize={data.pageSize}
        />
      </div>
    </>
  );
}
