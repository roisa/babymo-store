"use client";

import ProductGrid from "@/components/ProductGrid";
import { SectionHeader } from "@/components/CategoryGrid";
import { useLang } from "@/context/LanguageContext";
import type { Product } from "@/types";

/**
 * Client wrapper around the related products grid so the eyebrow/title
 * pick up the visitor's chosen language (ID or EN) instead of being
 * hard-coded in English in page.tsx.
 */
export default function RelatedSection({ products }: { products: Product[] }) {
  const { t } = useLang();
  return (
    <section className="py-14">
      <div className="container-soft">
        <SectionHeader
          eyebrow={t.section_related_eyebrow}
          title={t.section_related_title}
        />
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
