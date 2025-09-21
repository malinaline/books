// src/components/ResultsSkeleton.tsx
export default function ResultsSkeleton() {
  return (
    <div role="status" aria-live="polite" className="space-y-4">
      {/* Tydlig "laddar"-text som du redan ser – behåll gärna */}
      <p style={{ padding: 8, fontStyle: "italic" }}>Laddar resultat …</p>

      {/* Inbyggd CSS för skeleton-effekt */}
      <style>
        {`
          @keyframes skelPulse { 0%{opacity:.6} 50%{opacity:1} 100%{opacity:.6} }
          .skel { background:#e5e7eb; border-radius:12px; animation: skelPulse 1.2s ease-in-out infinite; }
          .card { border:1px solid #e5e7eb; border-radius:12px; padding:12px; }
          .grid { display:grid; gap:16px; grid-template-columns:repeat(1, minmax(0, 1fr)); }
          @media (min-width: 640px) { .grid { grid-template-columns:repeat(2, minmax(0, 1fr)); } }
          @media (min-width: 1024px){ .grid { grid-template-columns:repeat(4, minmax(0, 1fr)); } }
        `}
      </style>

      {/* Kort-grid */}
      <div className="grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card">
            {/* Omslagsplaceholder (3:4) */}
            <div
              className="skel"
              style={{ width: "100%", paddingTop: "133%", borderRadius: 10 }}
            />
            {/* Tre text-rader */}
            <div
              className="skel"
              style={{ height: 12, width: "75%", marginTop: 12 }}
            />
            <div
              className="skel"
              style={{ height: 10, width: "50%", marginTop: 8 }}
            />
            <div
              className="skel"
              style={{ height: 10, width: "35%", marginTop: 6 }}
            />
          </div>
        ))}
      </div>

      {/* Pagination-skeleton */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="skel"
          style={{ height: 36, width: 260, borderRadius: 8 }}
        />
      </div>
    </div>
  );
}
