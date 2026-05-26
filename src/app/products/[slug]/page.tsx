import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  SAMPLE_PRODUCTS,
  getProductBySlug,
  getProductsByCategory,
} from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";
import ProductGrid from "@/components/ProductGrid";
import { SectionHeader } from "@/components/CategoryGrid";
import RecentlyViewed from "@/components/RecentlyViewed";

type Params = { slug: string };

export function generateStaticParams() {
  return SAMPLE_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://babymo-shop.vercel.app";

  // Google Shopping / rich result eligibility
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: { "@type": "Brand", name: "Baby Mo" },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/products/${product.slug}`,
      priceCurrency: "IDR",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "Baby Mo" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />

      <RecentlyViewed currentProductId={product.id} />

      {related.length > 0 && (
        <section className="py-14">
          <div className="container-soft">
            <SectionHeader
              eyebrow="you might also love"
              title="In the same gentle world."
            />
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
