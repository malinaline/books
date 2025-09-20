// src/components/EmptyState.tsx
import React from "react";

type Props = {
  message: string;
  title?: string;
  children?: React.ReactNode; // valfritt extra innehåll (t.ex. en knapp)
};

export default function EmptyState({
  title = "Inget att visa ännu",
  message,
  children,
}: Props) {
  return (
    <section
      role="status"
      aria-live="polite"
      style={{
        border: "1px dashed #e5e7eb",
        borderRadius: 12,
        padding: 16,
        background: "#fafafa",
        color: "#6b7280",
      }}
    >
      <h2 style={{ margin: "0 0 4px 0", fontSize: 16 }}>{title}</h2>
      <p style={{ margin: 0 }}>{message}</p>
      {children && <div style={{ marginTop: 8 }}>{children}</div>}
    </section>
  );
}
