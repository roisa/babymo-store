import { notFound } from "next/navigation";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import {
  CATEGORIES,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/products";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd, breadcrumbLd, itemListLd } from "@/lib/seo";

type Params = { category: string };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Category" };
  const count = getProductsByCategory(category).length;
  const url = `${SITE_URL}/categories/${cat.slug}`;
  return {
    title: cat.name,
    description: `${cat.description} ${count} produk pilihan dari ${SITE_NAME}.`,
    alternates: { canonical: `/categories/${cat.slug}` },
    openGraph: {
      title: `${cat.name} · ${SITE_NAME}`,
      description: cat.description,
      url,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const products = getProductsByCategory(category);
  const catUrl = `${SITE_URL}/categories/${cat.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Beranda", url: SITE_URL },
            { name: "Belanja", url: `${SITE_URL}/products` },
            { name: cat.name, url: catUrl },
          ]),
          itemListLd(
            cat.name,
            products.map((p) => ({
              name: p.name,
              url: `${SITE_URL}/products/${p.slug}`,
            })),
          ),
        ]}
      />

      <div className="container-soft pt-8 pb-16">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-xs font-semibold text-ink-400 hover:text-grass-600"
        >
          ← All products
        </Link>

        <div className="mb-8 mt-4 flex items-start gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-grass-50 text-3xl ring-2 ring-grass-100">
            {cat.emoji}
          </span>
          <div>
            <span className="chip uppercase tracking-wider">category</span>
            <h1 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              {cat.name}
            </h1>
            <p className="mt-1 max-w-xl text-sm text-ink-600">
              {cat.description}
            </p>
          </div>
        </div>

        <ProductGrid products={products} priorityFirst />
      </div>
    </>
  );
}
