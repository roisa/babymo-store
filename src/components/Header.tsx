"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const { count, open } = useCart();
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ease-spring ${
        scrolled
          ? "bg-warmwhite/70 backdrop-blur-2xl backdrop-saturate-150"
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
          <Link href="/#faq" className="transition hover:text-ink-900">
            {t.nav_faq}
          </Link>
          <Link href="/admin" className="transition hover:text-ink-900">
            {t.nav_admin}
          </Link>
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageToggle />
          <Link
            href="/products"
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-white/70 text-ink-700 ring-1 ring-ink-900/8 backdrop-blur-xl transition hover:bg-white sm:flex"
            aria-label={t.nav_search}
          >
            <SearchIcon />
          </Link>
          <button
            onClick={open}
            aria-label={t.nav_cart}
            className="relative flex h-9 items-center gap-1.5 rounded-full bg-white/70 px-3 text-ink-700 ring-1 ring-ink-900/8 backdrop-blur-xl transition hover:bg-white"
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
  const sizeCls =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-[17px]";
  return (
    <span className={`logo-badge ${sizeCls}`}>
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-grass-fade text-[11px] font-bold text-white shadow-ios-grass">
        M
      </span>
      <span className="ml-1.5 tracking-tight">Baby Mo</span>
    </span>
  );
}

function SearchIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
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
