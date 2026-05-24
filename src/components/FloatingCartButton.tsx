"use client";

import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { formatIDR } from "@/lib/utils";

export default function FloatingCartButton() {
  const { count, subtotal, open } = useCart();
  const { t } = useLang();
  const pathname = usePathname();

  if (count === 0) return null;
  if (
    pathname?.startsWith("/payment") ||
    pathname?.startsWith("/checkout") ||
    pathname?.startsWith("/shipping-label") ||
    pathname?.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <button
      onClick={open}
      className="fixed bottom-6 right-5 z-30 hidden animate-slide-up items-center gap-2.5 rounded-full bg-grass-fade px-4 py-3 text-[13px] font-semibold text-white shadow-ios-grass transition hover:-translate-y-0.5 sm:flex"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-[11px] font-bold tabular-nums backdrop-blur">
        {count}
      </span>
      <span>{t.cart_view}</span>
      <span className="opacity-70">·</span>
      <span className="tabular-nums">{formatIDR(subtotal)}</span>
    </button>
  );
}
