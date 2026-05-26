"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { useCartBump } from "@/hooks/useCartBump";
import HeaderSearch from "./HeaderSearch";
import LanguageToggle from "./LanguageToggle";
import Mascot from "./Mascot";

export default function Header() {
  const { count, open } = useCart();
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const bumped = useCartBump();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ willChange: "background-color", transform: "translateZ(0)" }}
      className={`sticky top-0 z-40 transition-all duration-300 ease-spring ${
        scrolled
          ? "bg-warmwhite/80 backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent"
      }`}
    >
      <div className="container-soft flex h-[60px] items-center justify-between gap-3">
        <Link href="/" className="group flex items-center gap-2">
          <BabyMoLogo />
        </Link>

        <nav className="hidden items-center gap-7 text-[13px] font-semibold text-ink-600 md:flex">
          <Link href="/products" className="transition hover:text-ink-900">
            {t.nav_shop}
          </Link>
          <Link
            href="/products?filter=bestseller"
            className="transition hover:text-ink-900"
          >
            {t.nav_bestsellers}
          </Link>
          <Link href="/order" className="transition hover:text-ink-900">
            {t.footer_track_order}
          </Link>
          <Link href="/#faq" className="transition hover:text-ink-900">
            {t.nav_faq}
          </Link>
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageToggle />
          <HeaderSearch />
          <button
            onClick={open}
            aria-label={t.nav_cart}
            className={`relative flex h-9 items-center gap-1.5 rounded-full bg-white/70 px-3 text-ink-700 ring-1 ring-ink-900/[0.08] backdrop-blur-xl transition hover:bg-white ${
              bumped ? "animate-bump" : ""
            }`}
          >
            <BagIcon />
            <span className="text-[12px] font-semibold tabular-nums">
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export function BabyMoLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const textCls =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-[17px]";
  const mascotSize = size === "lg" ? 40 : size === "sm" ? 22 : 30;
  return (
    <span className={`logo-badge ${textCls}`}>
      <Mascot size={mascotSize} alt="Baby Mo mascot" />
      <span className="ml-1 tracking-tight">Baby Mo</span>
    </span>
  );
}

function BagIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8a3 3 0 1 1 6 0" strokeLinecap="round" />
    </svg>
  );
}
