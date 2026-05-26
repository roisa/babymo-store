"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { CATEGORIES, searchProducts } from "@/lib/products";
import { formatIDR } from "@/lib/utils";

/**
 * Lightweight site-wide search. Click the icon → glass modal opens with
 * an autofocused input. Live preview of up to 5 matches as you type;
 * Enter (or Cari) goes to /products?q=…
 */
export default function HeaderSearch() {
  const router = useRouter();
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Esc to close + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const matches = q.trim() ? searchProducts(q).slice(0, 5) : [];
  const popularCats = CATEGORIES.slice(0, 4);

  const go = (path: string) => {
    setOpen(false);
    setQ("");
    router.push(path);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (term) go(`/products?q=${encodeURIComponent(term)}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.nav_search}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-ink-700 ring-1 ring-ink-900/[0.08] backdrop-blur-xl transition hover:bg-white"
      >
        <SearchIcon />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex animate-fade-in items-start justify-center bg-ink-900/30 px-4 pt-[max(env(safe-area-inset-top),3rem)] backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-ios-2xl bg-warmwhite p-3 shadow-ios-xl ring-1 ring-ink-900/[0.06]"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={submit} className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
                <SearchIcon />
              </span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.product_search_placeholder}
                className="input pl-11 pr-4"
                aria-label={t.nav_search}
              />
            </form>

            {/* Live matches */}
            {matches.length > 0 && (
              <ul className="mt-2 max-h-[60vh] overflow-y-auto">
                {matches.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => go(`/products/${p.slug}`)}
                      className="flex w-full items-center justify-between gap-3 rounded-ios px-3 py-2.5 text-left transition hover:bg-ink-900/[0.04]"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] font-semibold text-ink-900">
                          {p.name}
                        </span>
                        {p.tagline && (
                          <span className="block truncate text-[11.5px] text-ink-400">
                            {p.tagline}
                          </span>
                        )}
                      </span>
                      <span className="font-display text-[14px] font-bold tabular-nums text-grass-700">
                        {formatIDR(p.price)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Empty-state: show popular categories */}
            {!q.trim() && (
              <div className="mt-3">
                <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">
                  {lang === "id" ? "rak populer" : "popular shelves"}
                </p>
                <div className="flex flex-wrap gap-1.5 px-1.5 pb-2">
                  {popularCats.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => go(`/categories/${c.slug}`)}
                      className="rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-ink-700 ring-1 ring-ink-900/[0.06] transition hover:-translate-y-0.5 hover:shadow-ios"
                    >
                      <span className="mr-1">{c.emoji}</span> {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {q.trim() && matches.length === 0 && (
              <p className="px-3 py-4 text-center text-[12.5px] text-ink-400">
                {lang === "id"
                  ? "Tidak ada hasil untuk "
                  : "No results for "}
                <span className="font-semibold text-ink-700">
                  &ldquo;{q}&rdquo;
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
