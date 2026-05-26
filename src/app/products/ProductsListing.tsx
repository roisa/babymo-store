"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { CATEGORIES, SAMPLE_PRODUCTS, searchProducts } from "@/lib/products";
import { useLang } from "@/context/LanguageContext";

type SortKey = "default" | "bestseller" | "price-asc" | "price-desc";

const SORT_LABEL: Record<"id" | "en", Record<SortKey, string>> = {
  id: {
    default: "Urutan default",
    bestseller: "Terlaris dulu",
    "price-asc": "Harga ↓",
    "price-desc": "Harga ↑",
  },
  en: {
    default: "Default order",
    bestseller: "Bestsellers first",
    "price-asc": "Price ↓",
    "price-desc": "Price ↑",
  },
};

function ProductsInner() {
  const sp = useSearchParams();
  const filter = sp.get("filter");
  const initialQ = sp.get("q") ?? "";
  const { t, lang } = useLang();
  const sortLabels = SORT_LABEL[lang];

  const [q, setQ] = useState(initialQ);
  const [activeCat, setActiveCat] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("default");

  // Re-sync when arriving from a shared /products?q=… link.
  useEffect(() => {
    setQ(initialQ);
  }, [initialQ]);

  const products = useMemo(() => {
    let list = q ? searchProducts(q) : SAMPLE_PRODUCTS;
    if (activeCat !== "all") list = list.filter((p) => p.category === activeCat);
    if (filter === "bestseller") list = list.filter((p) => p.bestseller);
    if (sort !== "default") {
      list = [...list].sort((a, b) => {
        switch (sort) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "bestseller":
            return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
          default:
            return 0;
        }
      });
    }
    return list;
  }, [q, activeCat, filter, sort]);

  return (
    <div className="container-soft pt-10 pb-16 sm:pt-12">
      <div className="mb-8 max-w-2xl">
        <span className="chip uppercase tracking-[0.12em]">{t.nav_shop}</span>
        <h1 className="mt-4 font-display text-[2.25rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-[3rem]">
          {filter === "bestseller"
            ? t.product_bestseller_title
            : t.product_listing_title}
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">
          {t.product_listing_subtitle}
        </p>
      </div>

      <div className="sticky top-[60px] z-20 -mx-5 mb-8 px-5 py-3 sm:mx-0 sm:px-0">
        <div className="rounded-ios-2xl glass-thick p-3">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
              <SearchIcon />
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.product_search_placeholder}
              className="input pl-11"
              aria-label={t.product_search_placeholder}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Pill
              active={activeCat === "all"}
              onClick={() => setActiveCat("all")}
            >
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

          <div className="mt-3 flex items-center justify-between gap-2 text-[12px] font-medium text-ink-400">
            <span className="tabular-nums">
              {products.length} {lang === "id" ? "produk" : products.length === 1 ? "item" : "items"}
            </span>
            <label className="inline-flex items-center gap-2">
              <span className="hidden sm:inline">
                {lang === "id" ? "Urutkan" : "Sort"}
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-ink-700 ring-1 ring-ink-900/[0.08] outline-none transition focus:ring-2 focus:ring-grass-400"
              >
                <option value="default">{sortLabels.default}</option>
                <option value="bestseller">{sortLabels.bestseller}</option>
                <option value="price-asc">{sortLabels["price-asc"]}</option>
                <option value="price-desc">{sortLabels["price-desc"]}</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {filter === "bestseller" && (
        <p className="chip-orange mb-5 inline-flex items-center gap-2">
          {t.product_bestseller_active}{" "}
          <Link href="/products" className="underline underline-offset-2">
            {t.product_clear}
          </Link>
        </p>
      )}

      <ProductGrid products={products} />
    </div>
  );
}

export default function ProductsListing() {
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
      className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[12px] font-semibold transition-all ease-spring active:scale-95 ${
        active
          ? "bg-ink-900 text-white shadow-ios"
          : "bg-white text-ink-600 ring-1 ring-ink-900/[0.08] hover:bg-ink-900/[0.04]"
      }`}
    >
      {children}
    </button>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
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
