"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { count, open } = useCart();
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
          ? "bg-warmwhite/80 backdrop-blur-xl shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-soft flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-xl">🌷</span>
          <span className="font-display text-2xl tracking-tight text-ink-900">
            Baby Mo
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-ink-600 md:flex">
          <Link href="/products" className="hover:text-ink-900 transition">
            Shop
          </Link>
          <Link href="/products?filter=bestseller" className="hover:text-ink-900 transition">
            Bestsellers
          </Link>
          <Link href="/#faq" className="hover:text-ink-900 transition">
            FAQ
          </Link>
          <Link href="/admin" className="hover:text-ink-900 transition">
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-white/70 ring-1 ring-ink-900/10 transition hover:bg-white sm:flex"
            aria-label="Search"
          >
            <SearchIcon />
          </Link>
          <button
            onClick={open}
            aria-label="Open cart"
            className="relative flex h-10 items-center gap-2 rounded-full bg-white/70 px-3 ring-1 ring-ink-900/10 transition hover:bg-white"
          >
            <BagIcon />
            <span className="text-xs font-medium text-ink-900">
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8a3 3 0 1 1 6 0" strokeLinecap="round" />
    </svg>
  );
}
