import type { Product } from "@/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  priorityFirst,
}: {
  products: Product[];
  priorityFirst?: boolean;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl bg-cream-100 px-6 py-12 text-center">
        <p className="text-3xl">🌧️</p>
        <p className="mt-2 font-display text-xl text-ink-900">
          Nothing here yet.
        </p>
        <p className="mt-1 text-sm text-ink-400">
          Try a different search or category — we're stocking gentle things all the time.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={priorityFirst && i < 4} />
      ))}
    </div>
  );
}
