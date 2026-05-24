"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { BabyMoLogo } from "./Header";
import { SOCIAL } from "@/lib/social";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-24 border-t border-ink-900/[0.06] bg-warmwhite/60 backdrop-blur-xl pb-[max(7rem,calc(env(safe-area-inset-bottom)+6rem))] sm:pb-0">
      <div className="container-soft py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <BabyMoLogo size="lg" />
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ink-600">
              {t.footer_tagline}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">
              {t.footer_shop}
            </h4>
            <ul className="space-y-2 text-[13.5px] font-medium text-ink-600">
              <li>
                <Link href="/products" className="transition hover:text-grass-700">
                  {t.footer_shop_all}
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/buku-cerita"
                  className="transition hover:text-grass-700"
                >
                  Buku Cerita
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/buku-mewarnai"
                  className="transition hover:text-grass-700"
                >
                  Buku Mewarnai
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/kaos"
                  className="transition hover:text-grass-700"
                >
                  Kaos & Apparel
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/boneka"
                  className="transition hover:text-grass-700"
                >
                  Boneka
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">
              {t.footer_help}
            </h4>
            <ul className="space-y-2 text-[13.5px] font-medium text-ink-600">
              <li>
                <Link href="/#faq" className="transition hover:text-grass-700">
                  {t.nav_faq}
                </Link>
              </li>
              <li>
                <Link href="/#shipping" className="transition hover:text-grass-700">
                  {t.footer_help_shipping}
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  className="transition hover:text-grass-700"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.footer_help_wa}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">
              {t.footer_stay}
            </h4>
            <p className="text-[13.5px] text-ink-600">{t.footer_stay_sub}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <SocialButton href={SOCIAL.instagram} label="Instagram">
                <InstagramIcon />
              </SocialButton>
              <SocialButton href={SOCIAL.tiktok} label="TikTok">
                <TikTokIcon />
              </SocialButton>
              <SocialButton href={SOCIAL.youtube} label="YouTube">
                <YouTubeIcon />
              </SocialButton>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-900/6 pt-6 text-[11.5px] text-ink-400 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Baby Mo. {t.footer_rights}</p>
          <p>{t.footer_motto}</p>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-ios bg-white text-ink-700 ring-1 ring-ink-900/6 shadow-ios transition-all ease-spring hover:-translate-y-0.5 hover:text-grass-700 hover:shadow-ios-lg"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.85a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.84-.24Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.5ZM10 15.5v-7l6 3.5Z" />
    </svg>
  );
}
