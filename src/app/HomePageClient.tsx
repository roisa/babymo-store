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
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import { useLang } from "@/context/LanguageContext";
import type { Product } from "@/types";

export default function HomePageClient({
  featured,
  bestsellers,
}: {
  featured: Product[];
  bestsellers: Product[];
}) {
  const { t, lang } = useLang();

  const marqueeItems =
    lang === "id"
      ? [
          { icon: "🌱", text: "Dipilih dengan hati" },
          { icon: "📦", text: "Packing hari sama" },
          { icon: "💌", text: "Cinta di tiap box" },
          { icon: "🚚", text: "Kirim ke seluruh Indonesia" },
          { icon: "💬", text: "Bantuan via WhatsApp" },
          { icon: "✨", text: "12.000+ pesanan" },
          { icon: "🎀", text: "Bungkus rapi untuk hadiah" },
          { icon: "🌷", text: "Dibuat di Indonesia" },
        ]
      : [
          { icon: "🌱", text: "Handpicked & curated" },
          { icon: "📦", text: "Same-day packing" },
          { icon: "💌", text: "Care in every box" },
          { icon: "🚚", text: "Ships across Indonesia" },
          { icon: "💬", text: "WhatsApp support" },
          { icon: "✨", text: "12,000+ orders shipped" },
          { icon: "🎀", text: "Gift-wrapped with love" },
          { icon: "🌷", text: "Made in Indonesia" },
        ];

  return (
    <>
      <Hero />

      {/* alive marquee strip between hero and featured */}
      <Marquee items={marqueeItems} />

      <section className="py-14 sm:py-20">
        <div className="container-soft">
          <Reveal>
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
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <ProductGrid products={featured} priorityFirst />
            </div>
          </Reveal>
        </div>
      </section>

      <CategoryGrid />

      <section id="bestsellers" className="py-14 sm:py-16">
        <div className="container-soft">
          <Reveal>
            <SectionHeader
              eyebrow={t.section_bestsellers_eyebrow}
              title={t.section_bestsellers_title}
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <ProductGrid products={bestsellers} />
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <QuoteCarousel />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <InstagramGallery />
      </Reveal>
      <Reveal>
        <TrustBadges />
      </Reveal>
      <Reveal>
        <FAQ />
      </Reveal>
    </>
  );
}
