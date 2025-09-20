// src/components/Pagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {
  total: number;
  page: number;
  pageSize: number;
};

export default function Pagination({ total, page, pageSize }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  const makeUrl = useCallback(
    (targetPage: number) => {
      const sp = new URLSearchParams(params.toString());

      // sätt/ta bort page i URL
      if (targetPage <= 1) sp.delete("page");
      else sp.set("page", String(targetPage));

      const query = sp.toString();
      return query ? `/?${query}` : "/";
    },
    [params]
  );

  const go = (p: number) => router.push(makeUrl(p));

  const btnStyle: React.CSSProperties = {
    padding: "0.5rem 0.75rem",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "white",
    cursor: "pointer",
  };

  const btnDisabledStyle: React.CSSProperties = {
    ...btnStyle,
    opacity: 0.5,
    cursor: "not-allowed",
  };

  return (
    <nav
      aria-label="Resultatsidor"
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        onClick={() => go(page - 1)}
        disabled={prevDisabled}
        aria-disabled={prevDisabled}
        style={prevDisabled ? btnDisabledStyle : btnStyle}
      >
        Föregående
      </button>

      <span aria-live="polite" style={{ fontSize: 14, opacity: 0.8 }}>
        Sida {page} av {totalPages}
      </span>

      <button
        onClick={() => go(page + 1)}
        disabled={nextDisabled}
        aria-disabled={nextDisabled}
        style={nextDisabled ? btnDisabledStyle : btnStyle}
      >
        Nästa
      </button>
    </nav>
  );
}
