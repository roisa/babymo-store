"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatIDR } from "@/lib/utils";
import { buildSimpleConsultLink } from "@/lib/whatsapp";
import StickyCheckoutBar from "@/components/StickyCheckoutBar";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { add, open } = useCart();
  const { notify } = useToast();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  const handleAdd = (alsoOpen = false) => {
    add(product, qty);
    notify(`${product.name} × ${qty} added 🌷`, "success");
    if (alsoOpen) setTimeout(open, 250);
  };

  return (
    <article className="container-soft pt-6 pb-32 sm:pb-16">
      <nav className="mb-4 text-xs text-ink-400">
        <Link href="/" className="hover:text-ink-900">Home</Link>{" "}
        <span className="opacity-50">/</span>{" "}
        <Link href="/products" className="hover:text-ink-900">Shop</Link>{" "}
        <span className="opacity-50">/</span>{" "}
        <span className="text-ink-600">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-cream-100 ring-1 ring-ink-900/5">
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
                    i === active ? "ring-pinky-400" : "ring-transparent hover:ring-ink-900/10"
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:pl-4">
          {product.bestseller && (
            <span className="mb-2 inline-flex rounded-full bg-pinky-200 px-3 py-1 text-[11px] font-medium text-ink-900">
              ✨ Bestseller
            </span>
          )}
          <h1 className="font-display text-3xl text-ink-900 sm:text-4xl">
            {product.name}
          </h1>
          {product.tagline && (
            <p className="mt-1 text-sm italic text-ink-400">{product.tagline}</p>
          )}

          <p className="mt-5 font-display text-3xl text-ink-900">
            {formatIDR(product.price)}
          </p>

          {/* Emotional storytelling */}
          <div className="mt-6 rounded-3xl bg-warm-gradient p-5 ring-1 ring-ink-900/5">
            <p className="text-xs font-semibold uppercase tracking-widest text-pinky-500">
              the little story
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-900">
              {product.description}
            </p>
          </div>

          {/* Shipping */}
          <ul className="mt-5 grid grid-cols-2 gap-3 text-xs text-ink-600">
            <Info icon="📦" title="Same-day packing" sub="before 3pm WIB" />
            <Info icon="🚚" title="Est. 2–5 days" sub="across Indonesia" />
            <Info icon="💬" title="WhatsApp support" sub="real humans" />
            <Info icon="🌷" title={`Stock: ${product.stock}`} sub="ready to ship" />
          </ul>

          {/* Quantity + actions (hidden on mobile, replaced by sticky bar) */}
          <div className="mt-6 hidden flex-wrap items-center gap-3 sm:flex">
            <div className="flex items-center gap-2 rounded-full bg-cream-100 p-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm shadow-sm active:scale-95"
                aria-label="Decrease"
              >
                −
              </button>
              <span className="min-w-8 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm shadow-sm active:scale-95"
                aria-label="Increase"
              >
                +
              </button>
            </div>
            <button onClick={() => handleAdd(true)} className="btn-primary flex-1 min-w-[180px]">
              Add to bag · {formatIDR(product.price * qty)}
            </button>
          </div>

          <a
            href={buildSimpleConsultLink(product.name)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-ink-600 hover:text-ink-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128c4a]">💬</span>
            Ask about this product on WhatsApp
          </a>

          {/* Reviews placeholder */}
          <div className="mt-8 rounded-3xl bg-white p-5 ring-1 ring-ink-900/5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-ink-900">Reviews</p>
              <span className="text-xs text-ink-400">4.9 · 128 reviews</span>
            </div>
            <p className="mt-2 text-xs italic text-ink-400">
              Verified reviews from our community coming soon 🌷
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
    <li className="flex items-center gap-2 rounded-2xl bg-white p-3 ring-1 ring-ink-900/5">
      <span className="text-base">{icon}</span>
      <div>
        <p className="text-xs font-medium text-ink-900">{title}</p>
        <p className="text-[11px] text-ink-400">{sub}</p>
      </div>
    </li>
  );
}
