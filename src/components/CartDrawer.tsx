"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { formatIDR } from "@/lib/utils";

export default function CartDrawer() {
  const { isOpen, close, items, subtotal, setQty, remove } = useCart();
  const { t } = useLang();
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      try {
        const saved = window.localStorage.getItem("babymo:delivery-notes");
        if (saved) setNotes(saved);
      } catch {}
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    try {
      window.localStorage.setItem("babymo:delivery-notes", notes);
    } catch {}
  }, [notes]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden
      />

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-warmwhite shadow-glow transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-grass-100 px-5 py-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900">
              {t.cart_title}
            </h2>
            <p className="text-xs text-ink-400">
              {items.length === 0
                ? t.cart_subtitle_empty
                : t.cart_subtitle_count(items.length)}
            </p>
          </div>
          <button
            onClick={close}
            className="rounded-full p-2 text-ink-600 hover:bg-cream-100"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <EmptyCart onBrowse={close} />
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="flex gap-3 rounded-2xl bg-white p-3 shadow-card ring-2 ring-grass-100"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-100">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={close}
                      className="line-clamp-2 text-sm font-bold text-ink-900 hover:text-grass-600"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-sm font-semibold text-grass-600">
                      {formatIDR(item.price)}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 rounded-full bg-cream-100 p-0.5 ring-1 ring-grass-100">
                        <button
                          onClick={() =>
                            setQty(item.productId, Math.max(0, item.quantity - 1))
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm active:scale-95"
                          aria-label="−"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQty(item.productId, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm active:scale-95"
                          aria-label="+"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.productId)}
                        className="text-xs font-semibold text-ink-400 hover:text-tangerine-500"
                      >
                        {t.cart_remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <div className="mt-5">
              <label className="label">{t.cart_notes_label}</label>
              <textarea
                className="input min-h-[80px]"
                placeholder={t.cart_notes_placeholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-grass-100 bg-white/80 px-5 py-4 backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink-600">
                {t.cart_subtotal}
              </span>
              <span className="font-display text-2xl font-bold text-grass-600">
                {formatIDR(subtotal)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="btn-primary w-full text-base"
            >
              {t.cart_checkout}
              <ArrowIcon />
            </Link>
            <p className="mt-2 text-center text-[11px] text-ink-400">
              {t.cart_helper}
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

function EmptyCart({ onBrowse }: { onBrowse: () => void }) {
  const { t } = useLang();
  return (
    <div className="flex h-full flex-col items-center justify-center py-12 text-center">
      <div className="relative mb-5 h-32 w-32">
        <div className="absolute inset-0 rounded-full bg-grass-100" />
        <div className="absolute inset-4 rounded-full bg-tangerine-100" />
        <div className="absolute inset-0 flex items-center justify-center text-5xl">
          🌱
        </div>
      </div>
      <h3 className="font-display text-xl font-bold text-ink-900">
        {t.cart_empty_title}
      </h3>
      <p className="mt-1 max-w-xs text-sm text-ink-400">{t.cart_empty_sub}</p>
      <Link href="/products" onClick={onBrowse} className="btn-orange mt-5">
        {t.cart_empty_cta}
      </Link>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
