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

      <section className="py-14 sm:py-20">
        <div className="container-soft">
          <div className="flex items-end justify-between gap-3">
            <SectionHeader
              eyebrow={t.section_featured_eyebrow}
              title={t.section_featured_title}
              subtitle={t.section_featured_subtitle}
            />
            <Link
              href="/products"
              className="hidden text-[13px] font-semibold text-grass-700 hover:text-grass-800 sm:inline"
            >
              {t.see_all}
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={featured} priorityFirst />
          </div>
        </div>
      </section>

      <CategoryGrid />

      <section id="bestsellers" className="py-14 sm:py-16">
        <div className="container-soft">
          <SectionHeader
            eyebrow={t.section_bestsellers_eyebrow}
            title={t.section_bestsellers_title}
          />
          <div className="mt-10">
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
