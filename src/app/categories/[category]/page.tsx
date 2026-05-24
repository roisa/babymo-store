import { notFound } from "next/navigation";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import {
  CATEGORIES,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/products";
import type { Metadata } from "next";

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
  return {
    title: cat.name,
    description: cat.description,
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

  return (
    <div className="container-soft pt-8 pb-16">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-xs text-ink-400 hover:text-ink-900"
      >
        ← All products
      </Link>

      <div className="mt-4 mb-8 flex items-start gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-warm-gradient text-3xl">
          {cat.emoji}
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-pinky-500">
            category
          </p>
          <h1 className="font-display text-3xl text-ink-900 sm:text-4xl">
            {cat.name}
          </h1>
          <p className="mt-1 max-w-xl text-sm text-ink-600">{cat.description}</p>
        </div>
      </div>

      <ProductGrid products={products} priorityFirst />
    </div>
  );
}
