"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatIDR } from "@/lib/utils";

type Props = { product: Product; priority?: boolean };

export default function ProductCard({ product, priority }: Props) {
  const { add, open } = useCart();
  const { notify } = useToast();
  const [wished, setWished] = useState(false);

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-3xl bg-cream-100 ring-1 ring-ink-900/5 transition-all duration-500 group-hover:shadow-glow"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {product.bestseller && (
          <span className="absolute left-3 top-3 rounded-full bg-pinky-300 px-2.5 py-1 text-[10px] font-semibold text-ink-900">
            Bestseller
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            setWished((v) => !v);
          }}
          aria-label="Wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink-600 backdrop-blur transition hover:bg-white hover:text-pinky-500"
        >
          <HeartIcon filled={wished} />
        </button>
      </Link>

      <div className="mt-3 flex flex-col gap-1.5 px-1">
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-1 text-sm font-medium text-ink-900 transition hover:text-pinky-500"
        >
          {product.name}
        </Link>
        {product.tagline && (
          <p className="line-clamp-1 text-xs text-ink-400">{product.tagline}</p>
        )}
        <div className="mt-1 flex items-center justify-between">
          <span className="font-display text-lg text-ink-900">
            {formatIDR(product.price)}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              add(product, 1);
              notify(`${product.name} added 🌷`, "success");
              setTimeout(open, 250);
            }}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-cream-50 transition active:scale-90 hover:bg-pinky-400 hover:text-ink-900"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
