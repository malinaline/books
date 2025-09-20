// src/app/loading.tsx
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="p-4 text-sm text-muted-foreground"
    >
      Laddar …
    </div>
  );
}
