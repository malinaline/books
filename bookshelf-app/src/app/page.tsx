import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";
import BookCard from "@/components/BookCard";
import Pagination from "@/components/Pagination";
import { getBaseUrl } from "@/lib/utils";

async function fetchSearch(q: string, page: number) {
  const base = await getBaseUrl(); // <- här väntar vi in headers()
  const res = await fetch(
    `${base}/api/search?q=${encodeURIComponent(q)}&page=${page}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Kunde inte hämta sökresultat");
  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const q = (searchParams?.q ?? "").trim();
  const page = Number(searchParams?.page ?? "1");
  const data = q ? await fetchSearch(q, page) : null;

  return (
    <>
      <h1>Böcker</h1>
      <SearchBar />
      {!q && <EmptyState message="Sök efter en bok för att börja." />}

      {q && data && (
        <>
          {data.items.length === 0 ? (
            <EmptyState message={`Inga träffar för “${q}”.`} />
          ) : (
            <>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {data.items.map((b: any) => (
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
          )}
        </>
      )}
    </>
  );
}
