"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState("");

  // Hämta initial query från URL
  useEffect(() => {
    setQ(params.get("q") ?? "");
  }, [params]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/?q=${encodeURIComponent(query)}&page=1` : "/");
  }

  function onClear() {
    setQ("");
    router.push("/");
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Boksökning"
      style={{ display: "flex", gap: 8, marginBottom: 16 }}
    >
      <label
        htmlFor="search"
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        Sök böcker
      </label>
      <input
        id="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Sök efter titel, författare, ämne…"
        autoComplete="off"
        style={{
          flex: 1,
          padding: "0.6rem 0.8rem",
          borderRadius: 8,
          border: "1px solid #e5e7eb",
        }}
      />
      {q && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Rensa sökning"
          style={{
            padding: "0.6rem 0.8rem",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "transparent",
          }}
        >
          Rensa
        </button>
      )}
      <button
        type="submit"
        style={{
          padding: "0.6rem 1rem",
          borderRadius: 8,
          border: "1px solid #e5e7eb",
        }}
      >
        Sök
      </button>
    </form>
  );
}
