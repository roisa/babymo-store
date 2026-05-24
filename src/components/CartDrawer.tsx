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
        className={`fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-md transition-opacity duration-300 ease-spring ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden
      />

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-warmwhite/95 backdrop-blur-2xl shadow-ios-xl transition-transform duration-500 ease-spring sm:inset-y-3 sm:right-3 sm:rounded-ios-3xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-ink-900/6 px-6 py-5">
          <div>
            <h2 className="font-display text-[22px] font-bold tracking-[-0.02em] text-ink-900">
              {t.cart_title}
            </h2>
            <p className="mt-0.5 text-[12px] text-ink-400">
              {items.length === 0
                ? t.cart_subtitle_empty
                : t.cart_subtitle_count(items.length)}
            </p>
          </div>
          <button
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/[0.06] text-ink-700 transition hover:bg-ink-900/[0.10]"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <EmptyCart onBrowse={close} />
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="flex gap-3 rounded-ios-xl bg-white p-3 ring-1 ring-ink-900/5 shadow-ios"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-ios bg-ink-900/[0.04]">
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
                      className="line-clamp-2 text-[13.5px] font-semibold leading-snug text-ink-900 hover:text-grass-700"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-[13px] font-medium tabular-nums text-ink-600">
                      {formatIDR(item.price)}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-full bg-ink-900/[0.05] p-0.5">
                        <button
                          onClick={() =>
                            setQty(item.productId, Math.max(0, item.quantity - 1))
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[13px] font-semibold shadow-ios transition active:scale-95"
                          aria-label="−"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-[12px] font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQty(item.productId, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[13px] font-semibold shadow-ios transition active:scale-95"
                          aria-label="+"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.productId)}
                        className="text-[12px] font-medium text-ink-400 hover:text-tangerine-500"
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
                className="input min-h-[78px]"
                placeholder={t.cart_notes_placeholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink-900/6 bg-white/70 px-6 py-5 backdrop-blur-2xl">
            <div className="mb-3 flex items-end justify-between">
              <span className="text-[13px] font-medium text-ink-600">
                {t.cart_subtotal}
              </span>
              <span className="font-display text-[24px] font-bold tracking-tight tabular-nums text-ink-900">
                {formatIDR(subtotal)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="btn-primary w-full text-[15px] py-3.5"
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
      <div className="relative mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-grass-50 text-4xl ring-1 ring-grass-100">
        🌱
      </div>
      <h3 className="font-display text-[20px] font-bold tracking-[-0.02em] text-ink-900">
        {t.cart_empty_title}
      </h3>
      <p className="mt-1 max-w-xs text-[13px] text-ink-400">{t.cart_empty_sub}</p>
      <Link href="/products" onClick={onBrowse} className="btn-primary mt-5">
        {t.cart_empty_cta}
      </Link>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
