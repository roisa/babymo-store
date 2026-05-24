"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useLang } from "@/context/LanguageContext";
import { formatIDR } from "@/lib/utils";
import { buildSimpleConsultLink } from "@/lib/whatsapp";
import StickyCheckoutBar from "@/components/StickyCheckoutBar";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { add, open } = useCart();
  const { notify } = useToast();
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  const handleAdd = (alsoOpen = false) => {
    add(product, qty);
    notify(t.toast_added_qty(product.name, qty), "success");
    if (alsoOpen) setTimeout(open, 250);
  };

  return (
    <article className="container-soft pt-6 pb-32 sm:pb-16">
      <nav className="mb-4 text-xs font-semibold text-ink-400">
        <Link href="/" className="hover:text-grass-600">
          {t.pdp_breadcrumb_home}
        </Link>{" "}
        <span className="opacity-50">/</span>{" "}
        <Link href="/products" className="hover:text-grass-600">
          {t.pdp_breadcrumb_shop}
        </Link>{" "}
        <span className="opacity-50">/</span>{" "}
        <span className="text-ink-600">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-cream-100 ring-2 ring-grass-100">
            <Image
              src={product.images[active] ?? product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover transition-opacity duration-500"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 transition ${
                    i === active
                      ? "ring-tangerine-400 ring-offset-2 ring-offset-warmwhite"
                      : "ring-grass-100 hover:ring-grass-300"
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:pl-4">
          {product.bestseller && (
            <span className="chip-orange mb-2 inline-flex">
              ✨ {t.product_badge_bestseller}
            </span>
          )}
          <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            {product.name}
          </h1>
          {product.tagline && (
            <p className="mt-1 text-sm italic text-ink-400">{product.tagline}</p>
          )}

          <p className="mt-5 font-display text-4xl font-bold text-grass-600">
            {formatIDR(product.price)}
          </p>

          <div className="mt-6 rounded-3xl bg-grass-50 p-5 ring-2 ring-grass-100">
            <span className="chip-orange uppercase tracking-wider">
              {t.pdp_story_eyebrow}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-ink-900">
              {product.description}
            </p>
          </div>

          <ul className="mt-5 grid grid-cols-2 gap-3 text-xs text-ink-600">
            <Info icon="📦" title={t.pdp_info_packing} sub={t.pdp_info_packing_sub} />
            <Info icon="🚚" title={t.pdp_info_eta} sub={t.pdp_info_eta_sub} />
            <Info icon="💬" title={t.pdp_info_support} sub={t.pdp_info_support_sub} />
            <Info
              icon="🌱"
              title={t.pdp_info_stock(product.stock)}
              sub={t.pdp_info_stock_sub}
            />
          </ul>

          <div className="mt-6 hidden flex-wrap items-center gap-3 sm:flex">
            <div className="flex items-center gap-2 rounded-full bg-cream-100 p-1 ring-1 ring-grass-100">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm active:scale-95"
                aria-label="−"
              >
                −
              </button>
              <span className="min-w-8 text-center text-sm font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm active:scale-95"
                aria-label="+"
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleAdd(true)}
              className="btn-primary flex-1 min-w-[200px]"
            >
              {t.pdp_add_to_bag} · {formatIDR(product.price * qty)}
            </button>
          </div>

          <a
            href={buildSimpleConsultLink(product.name)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-grass-600"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-grass-100 text-grass-700">
              💬
            </span>
            {t.pdp_consult}
          </a>

          <div className="mt-8 rounded-3xl bg-white p-5 ring-2 ring-grass-100">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-ink-900">{t.pdp_reviews}</p>
              <span className="text-xs font-semibold text-tangerine-500">
                {t.pdp_reviews_meta}
              </span>
            </div>
            <p className="mt-2 text-xs italic text-ink-400">
              {t.pdp_reviews_placeholder}
            </p>
          </div>
        </div>
      </div>

      <StickyCheckoutBar
        price={product.price}
        qty={qty}
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
    <li className="flex items-center gap-2 rounded-2xl bg-white p-3 ring-2 ring-grass-100">
      <span className="text-base">{icon}</span>
      <div>
        <p className="text-xs font-bold text-ink-900">{title}</p>
        <p className="text-[11px] text-ink-400">{sub}</p>
      </div>
    </li>
  );
}
