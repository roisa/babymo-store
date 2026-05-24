"use client";

import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatIDR } from "@/lib/utils";

export default function FloatingCartButton() {
  const { count, subtotal, open } = useCart();
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
      className="fixed bottom-20 right-4 z-30 hidden animate-slide-up items-center gap-3 rounded-full bg-ink-900 px-5 py-3 text-sm text-cream-50 shadow-glow transition hover:bg-ink-600 sm:flex sm:bottom-6"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pinky-300 text-ink-900 font-medium">
        {count}
      </span>
      <span>View cart</span>
      <span className="opacity-80">·</span>
      <span className="font-medium">{formatIDR(subtotal)}</span>
    </button>
  );
}
