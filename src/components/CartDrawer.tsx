"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatIDR } from "@/lib/utils";

export default function CartDrawer() {
  const { isOpen, close, items, subtotal, setQty, remove } = useCart();
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
      {/* backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-ink-900/30 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden
      />

      {/* drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-warmwhite shadow-glow transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-ink-900/5 px-5 py-4">
          <div>
            <h2 className="font-display text-2xl text-ink-900">Your bag</h2>
            <p className="text-xs text-ink-400">
              {items.length === 0
                ? "It's quietly empty in here"
                : `${items.length} item${items.length > 1 ? "s" : ""} resting softly`}
            </p>
          </div>
          <button
            onClick={close}
            className="rounded-full p-2 text-ink-600 hover:bg-cream-100"
            aria-label="Close cart"
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
                  className="flex gap-3 rounded-2xl bg-white p-3 shadow-card ring-1 ring-ink-900/5"
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
                      className="line-clamp-2 text-sm font-medium text-ink-900 hover:text-pinky-500"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-ink-600">
                      {formatIDR(item.price)}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 rounded-full bg-cream-100 p-0.5">
                        <button
                          onClick={() =>
                            setQty(item.productId, Math.max(0, item.quantity - 1))
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow-sm active:scale-95"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQty(item.productId, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow-sm active:scale-95"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.productId)}
                        className="text-xs text-ink-400 hover:text-pinky-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <div className="mt-5">
              <label className="label">Delivery notes (optional)</label>
              <textarea
                className="input min-h-[80px]"
                placeholder="e.g. tolong bungkus rapi, ini hadiah 🌷"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink-900/5 bg-white/70 px-5 py-4 backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-ink-600">Subtotal</span>
              <span className="font-display text-2xl text-ink-900">
                {formatIDR(subtotal)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={close}
              className="btn-primary w-full"
            >
              Checkout
              <ArrowIcon />
            </Link>
            <p className="mt-2 text-center text-[11px] text-ink-400">
              Shipping calculated at checkout · WhatsApp confirmation
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

function EmptyCart({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-12 text-center">
      <div className="relative mb-5 h-32 w-32">
        <div className="absolute inset-0 rounded-full bg-pinky-100" />
        <div className="absolute inset-4 rounded-full bg-lavender-100" />
        <div className="absolute inset-0 flex items-center justify-center text-5xl">
          🌷
        </div>
      </div>
      <h3 className="font-display text-xl text-ink-900">
        Your bag is taking a quiet moment.
      </h3>
      <p className="mt-1 max-w-xs text-sm text-ink-400">
        Find something gentle to keep you company today.
      </p>
      <Link href="/products" onClick={onBrowse} className="btn-pink mt-5">
        Browse products
      </Link>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
