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
            />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5 hide-scrollbar">
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
      className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[12px] font-semibold transition-all ease-spring active:scale-95 ${
        active
          ? "bg-ink-900 text-white shadow-ios"
          : "bg-white text-ink-600 ring-1 ring-ink-900/8 hover:bg-ink-900/[0.04]"
      }`}
    >
      {children}
    </button>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
