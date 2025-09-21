// src/app/page.tsx
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";
import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";
import ResultsSkeleton from "@/components/ResultsSkeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  // 👇 Vänta in searchParams innan du använder dem
  const sp = await searchParams;

  const q = (sp.q ?? "").trim();
  const page = Number(sp.page ?? "1") || 1;

  return (
    <>
      <h1>Leta efter en bok i vår bokhylla</h1>
      <SearchBar />

      {!q && <EmptyState message="Sök efter en bok för att börja!" />}

      {q && (
        <Suspense
          key={`${q}:${page}`}
          fallback={
            <>
              <p style={{ padding: 8, fontStyle: "italic" }}></p>
              <ResultsSkeleton />
            </>
          }
        >
          <SearchResults q={q} page={page} />
        </Suspense>
      )}
    </>
  );
}
