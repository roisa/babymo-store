"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useLang } from "@/context/LanguageContext";
import { useStock } from "@/hooks/useStock";
import { formatIDR } from "@/lib/utils";

type Props = { product: Product; priority?: boolean };

export default function ProductCard({ product, priority }: Props) {
  const { add, open } = useCart();
  const { notify } = useToast();
  const { t } = useLang();
  const [wished, setWished] = useState(false);
  const [imgError, setImgError] = useState(false);
  const stock = useStock(product.id, product.stock);
  const soldOut = stock === 0;
  const lowStock = stock > 0 && stock <= 3;

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-ios-2xl bg-cream-100 ring-1 ring-ink-900/6 transition-all duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:shadow-ios-lg"
      >
        {imgError || !product.images[0] ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cream-100 to-grass-50 text-5xl">
            🌱
          </div>
        ) : (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.06]"
            onError={() => setImgError(true)}
          />
        )}

        {soldOut ? (
          <span className="absolute left-3 top-3 rounded-full bg-ink-900/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xl">
            {t.product_badge_sold_out}
          </span>
        ) : lowStock ? (
          <span className="absolute left-3 top-3 rounded-full bg-tangerine-400/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xl">
            {t.product_badge_low_stock(stock)}
          </span>
        ) : product.bestseller ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-grass-700 ring-1 ring-grass-100 backdrop-blur-xl">
            {t.product_badge_bestseller}
          </span>
        ) : null}

        {soldOut && (
          <div className="absolute inset-0 bg-warmwhite/30 backdrop-grayscale-[0.4]" />
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            setWished((v) => !v);
          }}
          aria-label="Wishlist"
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-xl transition-all ease-spring ${
            wished
              ? "bg-tangerine-400 text-white shadow-ios-tangerine"
              : "bg-white/80 text-ink-600 ring-1 ring-ink-900/8 hover:text-tangerine-500"
          }`}
        >
          <HeartIcon filled={wished} />
        </button>
      </Link>

      <div className="mt-3 flex flex-col gap-1 px-0.5">
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-1 text-[14px] font-semibold tracking-[-0.01em] text-ink-900 transition hover:text-grass-700"
        >
          {product.name}
        </Link>
        {product.tagline && (
          <p className="line-clamp-1 text-[12px] text-ink-400">
            {product.tagline}
          </p>
        )}
        <div className="mt-1.5 flex items-center justify-between">
          <span className="font-display text-[16px] font-bold tracking-tight tabular-nums text-ink-900">
            {formatIDR(product.price)}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (soldOut) return;
              add(product, 1);
              notify(t.toast_added(product.name), "success");
              setTimeout(open, 250);
            }}
            disabled={soldOut}
            aria-label={`${t.product_add_aria}: ${product.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-white shadow-ios transition-all ease-spring active:scale-90 hover:bg-grass-600 disabled:cursor-not-allowed disabled:bg-ink-200 disabled:text-ink-400 disabled:shadow-none"
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
      strokeWidth="1.8"
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
