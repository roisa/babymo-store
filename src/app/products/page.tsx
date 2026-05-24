"use client";

import { useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { CATEGORIES, SAMPLE_PRODUCTS, searchProducts } from "@/lib/products";
import { useLang } from "@/context/LanguageContext";

function ProductsInner() {
  const sp = useSearchParams();
  const filter = sp.get("filter");
  const { t } = useLang();

  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");

  const products = useMemo(() => {
    let list = q ? searchProducts(q) : SAMPLE_PRODUCTS;
    if (activeCat !== "all") list = list.filter((p) => p.category === activeCat);
    if (filter === "bestseller") list = list.filter((p) => p.bestseller);
    return list;
  }, [q, activeCat, filter]);

  return (
    <div className="container-soft pt-8 pb-16">
      <div className="mb-6 max-w-2xl">
        <span className="chip uppercase tracking-wider">{t.nav_shop}</span>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink-900 sm:text-5xl">
          {filter === "bestseller"
            ? t.product_bestseller_title
            : t.product_listing_title}
        </h1>
        <p className="mt-2 text-sm text-ink-600">
          {t.product_listing_subtitle}
        </p>
      </div>

      <div className="sticky top-16 z-20 -mx-5 mb-6 bg-warmwhite/85 px-5 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-3xl sm:px-4">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
            <SearchIcon />
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.product_search_placeholder}
            className="input pl-11"
          />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <Pill active={activeCat === "all"} onClick={() => setActiveCat("all")}>
            {t.product_filter_all}
          </Pill>
          {CATEGORIES.map((c) => (
            <Pill
              key={c.slug}
              active={activeCat === c.slug}
              onClick={() => setActiveCat(c.slug)}
            >
              <span className="mr-1">{c.emoji}</span> {c.name}
            </Pill>
          ))}
        </div>
      </div>

      {filter === "bestseller" && (
        <p className="chip-orange mb-4 inline-flex items-center gap-2">
          {t.product_bestseller_active}{" "}
          <Link href="/products" className="underline">
            {t.product_clear}
          </Link>
        </p>
      )}

      <ProductGrid products={products} />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-soft py-20 text-center text-ink-400">
          Loading…
        </div>
      }
    >
      <ProductsInner />
    </Suspense>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
        active
          ? "bg-grass-400 text-white shadow-pop"
          : "bg-white text-ink-600 ring-2 ring-grass-100 hover:bg-grass-50"
      }`}
    >
      {children}
    </button>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
