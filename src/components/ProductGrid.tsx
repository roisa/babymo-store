"use client";

import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import { useLang } from "@/context/LanguageContext";

export default function ProductGrid({
  products,
  priorityFirst,
}: {
  products: Product[];
  priorityFirst?: boolean;
}) {
  const { t } = useLang();

  if (products.length === 0) {
    return (
      <div className="rounded-3xl bg-cream-100 px-6 py-12 text-center ring-2 ring-grass-100">
        <p className="text-3xl">🌧️</p>
        <p className="mt-2 font-display text-xl font-bold text-ink-900">
          {t.product_empty_title}
        </p>
        <p className="mt-1 text-sm text-ink-400">{t.product_empty_sub}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={priorityFirst && i < 4} />
      ))}
    </div>
  );
}
