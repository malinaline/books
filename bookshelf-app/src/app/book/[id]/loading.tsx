import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBook() {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Laddar bokdetaljer …</span>

      <article className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Skeleton className="w-full h-[420px] rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-24 w-full" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
