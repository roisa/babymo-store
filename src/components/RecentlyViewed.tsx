"use client";

import { useEffect, useMemo, useState } from "react";
import { SAMPLE_PRODUCTS } from "@/lib/products";
import { RECENT_EVENT, readRecent, trackRecent } from "@/lib/recent";
import { useLang } from "@/context/LanguageContext";
import ProductGrid from "./ProductGrid";
import { SectionHeader } from "./CategoryGrid";

export default function RecentlyViewed({
  currentProductId,
}: {
  currentProductId?: string;
}) {
  const { lang } = useLang();
  const [ids, setIds] = useState<string[]>([]);

  // Track current view on mount; observe future updates from other tabs.
  useEffect(() => {
    if (currentProductId) trackRecent(currentProductId);
    setIds(readRecent());
    const sync = () => setIds(readRecent());
    window.addEventListener(RECENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(RECENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [currentProductId]);

  const products = useMemo(() => {
    const exclude = currentProductId ?? "";
    return ids
      .filter((id) => id !== exclude)
      .map((id) => SAMPLE_PRODUCTS.find((p) => p.id === id))
      .filter((p): p is (typeof SAMPLE_PRODUCTS)[number] => Boolean(p))
      .slice(0, 4);
  }, [ids, currentProductId]);

  if (products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container-soft">
        <SectionHeader
          eyebrow={lang === "id" ? "baru kamu lihat" : "recently viewed"}
          title={
            lang === "id" ? "Kembali ke yang sempat." : "Back to what caught your eye."
          }
        />
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
