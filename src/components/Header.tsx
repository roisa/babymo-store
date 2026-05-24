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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-warmwhite/90 backdrop-blur-xl shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-soft flex h-16 items-center justify-between gap-3">
        <Link href="/" className="group flex items-center gap-2">
          <BabyMoLogo />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-ink-600 md:flex">
          <Link href="/products" className="transition hover:text-grass-600">
            {t.nav_shop}
          </Link>
          <Link
            href="/products?filter=bestseller"
            className="transition hover:text-grass-600"
          >
            {t.nav_bestsellers}
          </Link>
          <Link href="/#faq" className="transition hover:text-grass-600">
            {t.nav_faq}
          </Link>
          <Link href="/admin" className="transition hover:text-grass-600">
            {t.nav_admin}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Link
            href="/products"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-white text-grass-700 ring-2 ring-grass-200 transition hover:bg-grass-50 sm:flex"
            aria-label={t.nav_search}
          >
            <SearchIcon />
          </Link>
          <button
            onClick={open}
            aria-label={t.nav_cart}
            className="relative flex h-10 items-center gap-2 rounded-full bg-white px-3 text-grass-700 ring-2 ring-grass-200 transition hover:bg-grass-50"
          >
            <BagIcon />
            <span className="text-xs font-bold">{count}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export function BabyMoLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeCls =
    size === "lg" ? "text-2xl px-4 py-2" : size === "sm" ? "text-xs px-2 py-1" : "text-[15px] px-3 py-1.5";
  return (
    <span className={`logo-badge leading-none ${sizeCls}`}>
      <span>Baby</span>
      <span className="rounded-md bg-white px-1.5 py-0.5 text-grass-600 ring-2 ring-grass-200">
        Mo
      </span>
    </span>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8a3 3 0 1 1 6 0" strokeLinecap="round" />
    </svg>
  );
}
