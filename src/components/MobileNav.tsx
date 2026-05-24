"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";

export default function MobileNav() {
  const pathname = usePathname();
  const { open, count } = useCart();
  const { t } = useLang();

  if (
    pathname?.startsWith("/payment") ||
    pathname?.startsWith("/shipping-label") ||
    pathname?.startsWith("/admin")
  ) {
    return null;
  }

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-grass-100 bg-warmwhite/95 backdrop-blur-xl sm:hidden">
      <div className="grid grid-cols-4 items-center px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        <Tab href="/" active={pathname === "/"} label={t.nav_home}>
          <HomeIcon />
        </Tab>
        <Tab href="/products" active={isActive("/products")} label={t.nav_shop}>
          <ShopIcon />
        </Tab>
        <Tab href="/#faq" active={false} label={t.nav_help}>
          <HelpIcon />
        </Tab>
        <button
          onClick={open}
          className="relative flex flex-col items-center gap-1 rounded-2xl px-2 py-1.5 text-[11px] font-semibold text-grass-700 transition active:scale-95"
          aria-label={t.nav_cart}
        >
          <span className="relative">
            <BagIcon />
            {count > 0 && (
              <span className="absolute -right-2 -top-1.5 rounded-full bg-tangerine-400 px-1.5 text-[10px] font-bold text-white ring-2 ring-white">
                {count}
              </span>
            )}
          </span>
          <span>{t.nav_cart}</span>
        </button>
      </div>
    </nav>
  );

  function Tab({
    href,
    active,
    label,
    children,
  }: {
    href: string;
    active: boolean;
    label: string;
    children: React.ReactNode;
  }) {
    return (
      <Link
        href={href}
        className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-1.5 text-[11px] font-semibold transition ${
          active ? "text-grass-600" : "text-ink-400 hover:text-grass-600"
        }`}
      >
        {children}
        <span>{label}</span>
      </Link>
    );
  }
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-9Z" strokeLinejoin="round" />
    </svg>
  );
}
function ShopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 8h14l-1 12H6L5 8Z" strokeLinejoin="round" />
      <path d="M9 8a3 3 0 1 1 6 0" strokeLinecap="round" />
    </svg>
  );
}
function HelpIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17h.01" strokeLinecap="round" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8a3 3 0 1 1 6 0" strokeLinecap="round" />
    </svg>
  );
}
