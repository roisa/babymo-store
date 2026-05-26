import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  SAMPLE_PRODUCTS,
  getCategoryBySlug,
  getProductBySlug,
  getProductsByCategory,
} from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";
import RelatedSection from "./RelatedSection";
import RecentlyViewed from "@/components/RecentlyViewed";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd, breadcrumbLd } from "@/lib/seo";

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
  const url = `${SITE_URL}/products/${product.slug}`;
  // No explicit `openGraph.images` here so Next.js auto-attaches the
  // dynamic /products/[slug]/opengraph-image route — gives a branded
  // 1200×630 card with the product name + price chip rather than just
  // the raw product photo.
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} · ${SITE_NAME}`,
      description: product.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.tagline ?? product.description,
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

  const category = getCategoryBySlug(product.category);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const url = `${SITE_URL}/products/${product.slug}`;

  // Google Shopping / rich result eligibility
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: category?.name,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "IDR",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: SITE_NAME },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "ID",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
    },
  };

  const breadcrumb = breadcrumbLd([
    { name: "Beranda", url: SITE_URL },
    { name: "Belanja", url: `${SITE_URL}/products` },
    ...(category
      ? [
          {
            name: category.name,
            url: `${SITE_URL}/categories/${category.slug}`,
          },
        ]
      : []),
    { name: product.name, url },
  ]);

  return (
    <>
      <JsonLd data={[productLd, breadcrumb]} />
      <ProductDetailClient product={product} />

      <RecentlyViewed currentProductId={product.id} />

      {related.length > 0 && <RelatedSection products={related} />}
    </>
  );
}
