// src/components/ErrorState.tsx
import React from "react";

type Props = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Något gick fel",
  message,
  onRetry,
}: Props) {
  return (
    <section
      role="alert"
      aria-live="assertive"
      style={{
        border: "1px solid #fecaca",
        background: "#fef2f2",
        color: "#991b1b",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <h2 style={{ margin: "0 0 4px 0", fontSize: 16 }}>{title}</h2>
      <p style={{ margin: 0 }}>{message}</p>
      {onRetry && (
        <div style={{ marginTop: 8 }}>
          <button
            onClick={onRetry}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: 8,
              border: "1px solid #ef4444",
              background: "white",
              color: "#991b1b",
              cursor: "pointer",
            }}
          >
            Försök igen
          </button>
        </div>
      )}
    </section>
  );
}
