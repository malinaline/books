// src/app/error.tsx
"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Logga felet (bra för debugging)
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="border rounded-xl p-4">
      <h2 style={{ marginTop: 0 }}>Något gick fel</h2>
      <p style={{ color: "var(--muted-fg, #6b7280)" }}>
        {error.message || "Oväntat fel inträffade."}
      </p>
      <button onClick={reset} style={{ marginTop: 8 }}>
        Försök igen
      </button>
    </div>
  );
}
