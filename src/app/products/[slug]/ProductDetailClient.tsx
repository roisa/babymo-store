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
import { buildSimpleConsultLink } from "@/lib/whatsapp";
import StickyCheckoutBar from "@/components/StickyCheckoutBar";
import Lightbox from "@/components/Lightbox";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { add, open } = useCart();
  const { notify } = useToast();
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const markImgError = (i: number) =>
    setImgErrors((m) => ({ ...m, [i]: true }));

  const stock = useStock(product.id, product.stock);
  const soldOut = stock === 0;
  const safeQty = Math.min(qty, Math.max(1, stock));

  const handleAdd = (alsoOpen = false) => {
    if (soldOut) return;
    add(product, safeQty);
    notify(t.toast_added_qty(product.name, safeQty), "success");
    if (alsoOpen) setTimeout(open, 250);
  };

  return (
    <article className="container-soft pt-6 pb-32 sm:pb-16">
      <nav className="mb-5 text-[12px] font-medium text-ink-400">
        <Link href="/" className="transition hover:text-ink-700">
          {t.pdp_breadcrumb_home}
        </Link>{" "}
        <span className="text-ink-200">/</span>{" "}
        <Link href="/products" className="transition hover:text-ink-700">
          {t.pdp_breadcrumb_shop}
        </Link>{" "}
        <span className="text-ink-200">/</span>{" "}
        <span className="text-ink-600">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <button
            type="button"
            onClick={() => {
              if (!imgErrors[active] && product.images[active]) setZoom(true);
            }}
            aria-label={
              imgErrors[active] || !product.images[active]
                ? product.name
                : `${product.name} — tap to zoom`
            }
            className="group relative block aspect-square w-full overflow-hidden rounded-ios-3xl bg-cream-100 ring-1 ring-ink-900/[0.06] shadow-ios"
          >
            {imgErrors[active] || !product.images[active] ? (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cream-100 to-grass-50 text-7xl">
                🌱
              </div>
            ) : (
              <>
                <Image
                  src={product.images[active] ?? product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-transform duration-500 ease-spring group-hover:scale-[1.02]"
                  onError={() => markImgError(active)}
                />
                <span className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-ink-700 ring-1 ring-ink-900/[0.06] backdrop-blur transition group-hover:bg-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5M8 11h6M11 8v6" strokeLinecap="round" />
                  </svg>
                </span>
              </>
            )}
          </button>
          {zoom && (
            <Lightbox
              images={product.images}
              index={active}
              alt={product.name}
              onClose={() => setZoom(false)}
              onIndexChange={setActive}
            />
          )}
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-ios bg-cream-100 transition-all ease-spring ${
                    i === active
                      ? "ring-2 ring-grass-400 ring-offset-2 ring-offset-warmwhite"
                      : "ring-1 ring-ink-900/6 hover:ring-ink-900/15"
                  }`}
                >
                  {imgErrors[i] ? (
                    <div className="flex h-full w-full items-center justify-center text-lg">
                      🌱
                    </div>
                  ) : (
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                      onError={() => markImgError(i)}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:pl-2">
          {product.bestseller && (
            <span className="chip mb-3 inline-flex uppercase tracking-[0.12em]">
              ✨ {t.product_badge_bestseller}
            </span>
          )}
          <h1 className="font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.025em] text-ink-900 sm:text-[2.5rem]">
            {product.name}
          </h1>
          {product.tagline && (
            <p className="mt-2 text-[14px] text-ink-400">{product.tagline}</p>
          )}

          <p className="mt-6 font-display text-[2rem] font-bold tracking-tight tabular-nums text-ink-900">
            {formatIDR(product.price)}
          </p>

          <div className="mt-6 rounded-ios-2xl glass-thick p-5">
            <span className="chip uppercase tracking-[0.12em]">
              {t.pdp_story_eyebrow}
            </span>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-700">
              {product.description}
            </p>
          </div>

          <ul className="mt-5 grid grid-cols-2 gap-2.5">
            <Info icon="📦" title={t.pdp_info_packing} sub={t.pdp_info_packing_sub} />
            <Info icon="🚚" title={t.pdp_info_eta} sub={t.pdp_info_eta_sub} />
            <Info icon="💬" title={t.pdp_info_support} sub={t.pdp_info_support_sub} />
            <Info
              icon="🌱"
              title={
                soldOut
                  ? t.product_badge_sold_out
                  : stock <= 5
                    ? t.product_badge_low_stock(stock)
                    : t.pdp_info_stock_available
              }
              sub={soldOut ? "—" : t.pdp_info_stock_sub}
            />
          </ul>

          <div className="mt-7 hidden flex-wrap items-center gap-2.5 sm:flex">
            <div className="flex items-center gap-1 rounded-full bg-ink-900/[0.05] p-0.5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={soldOut}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[14px] font-semibold shadow-ios active:scale-95 disabled:opacity-50"
                aria-label="−"
              >
                −
              </button>
              <span className="min-w-7 text-center text-[14px] font-semibold tabular-nums">
                {safeQty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(stock || 1, q + 1))}
                disabled={soldOut || safeQty >= stock}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[14px] font-semibold shadow-ios active:scale-95 disabled:opacity-50"
                aria-label="+"
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleAdd(true)}
              disabled={soldOut}
              className="btn-primary flex-1 min-w-[220px] text-[15px] py-3.5 disabled:bg-ink-200 disabled:text-ink-400 disabled:shadow-none"
            >
              {soldOut
                ? t.pdp_sold_out
                : `${t.pdp_add_to_bag} · ${formatIDR(product.price * safeQty)}`}
            </button>
          </div>

          <a
            href={buildSimpleConsultLink(product.name)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-ink-600 transition hover:text-grass-700"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-grass-50 text-grass-700 ring-1 ring-grass-100">
              💬
            </span>
            {t.pdp_consult}
          </a>

          <div className="mt-8 rounded-ios-2xl bg-white p-5 ring-1 ring-ink-900/[0.06] shadow-ios">
            <p className="text-[13.5px] font-semibold tracking-[-0.01em] text-ink-900">
              {t.pdp_reviews}
            </p>
            <p className="mt-2 text-[12.5px] italic text-ink-400">
              {t.pdp_reviews_placeholder}
            </p>
          </div>
        </div>
      </div>

      <StickyCheckoutBar
        price={product.price}
        qty={safeQty}
        maxQty={stock}
        soldOut={soldOut}
        onChangeQty={setQty}
        onAdd={() => handleAdd(true)}
      />
    </article>
  );
}

function Info({
  icon,
  title,
  sub,
}: {
  icon: string;
  title: string;
  sub: string;
}) {
  return (
    <li className="flex items-center gap-2.5 rounded-ios bg-white p-3 ring-1 ring-ink-900/6 shadow-ios">
      <span className="text-base">{icon}</span>
      <div>
        <p className="text-[12.5px] font-semibold tracking-[-0.01em] text-ink-900">
          {title}
        </p>
        <p className="text-[11px] text-ink-400">{sub}</p>
      </div>
    </li>
  );
}
