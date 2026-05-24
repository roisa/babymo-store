import Hero from "@/components/Hero";
import QuoteCarousel from "@/components/QuoteCarousel";
import CategoryGrid, { SectionHeader } from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import TrustBadges from "@/components/TrustBadges";
import InstagramGallery from "@/components/InstagramGallery";
import { SAMPLE_PRODUCTS } from "@/lib/products";
import Link from "next/link";

export default function HomePage() {
  const featured = SAMPLE_PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const bestsellers = SAMPLE_PRODUCTS.filter((p) => p.bestseller).slice(0, 4);

  return (
    <>
      <Hero />

      <section className="py-8 sm:py-12">
        <div className="container-soft">
          <div className="flex items-end justify-between">
            <SectionHeader
              eyebrow="featured"
              title="A little something soft."
              subtitle="Pieces our team is gently obsessed with this season."
            />
            <Link
              href="/products"
              className="hidden text-sm text-pinky-500 hover:underline sm:inline"
            >
              See all →
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
            eyebrow="bestsellers"
            title="What our community keeps reaching for."
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
