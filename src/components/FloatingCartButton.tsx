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
      className="fixed bottom-20 right-4 z-30 hidden animate-slide-up items-center gap-3 rounded-full bg-grass-400 px-5 py-3 text-sm font-bold text-white shadow-pop transition hover:-translate-y-0.5 hover:bg-grass-500 sm:flex sm:bottom-6"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-grass-700">
        {count}
      </span>
      <span>{t.cart_view}</span>
      <span className="opacity-80">·</span>
      <span>{formatIDR(subtotal)}</span>
    </button>
  );
}
