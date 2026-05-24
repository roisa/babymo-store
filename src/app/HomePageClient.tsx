"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import QuoteCarousel from "@/components/QuoteCarousel";
import CategoryGrid, { SectionHeader } from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import TrustBadges from "@/components/TrustBadges";
import InstagramGallery from "@/components/InstagramGallery";
import { useLang } from "@/context/LanguageContext";
import type { Product } from "@/types";

export default function HomePageClient({
  featured,
  bestsellers,
}: {
  featured: Product[];
  bestsellers: Product[];
}) {
  const { t } = useLang();

  return (
    <>
      <Hero />

      <section className="py-10 sm:py-14">
        <div className="container-soft">
          <div className="flex items-end justify-between gap-3">
            <SectionHeader
              eyebrow={t.section_featured_eyebrow}
              title={t.section_featured_title}
              subtitle={t.section_featured_subtitle}
            />
            <Link
              href="/products"
              className="hidden text-sm font-semibold text-grass-600 hover:underline sm:inline"
            >
              {t.see_all}
            </Link>
          </div>
          <div className="mt-8">
            <ProductGrid products={featured} priorityFirst />
          </div>
        </div>
      </section>

      <CategoryGrid />

      <section id="bestsellers" className="py-12">
        <div className="container-soft">
          <SectionHeader
            eyebrow={t.section_bestsellers_eyebrow}
            title={t.section_bestsellers_title}
          />
          <div className="mt-8">
            <ProductGrid products={bestsellers} />
          </div>
        </div>
      </section>

      <QuoteCarousel />
      <Testimonials />
      <InstagramGallery />
      <TrustBadges />
      <FAQ />
    </>
  );
}
