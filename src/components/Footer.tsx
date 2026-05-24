"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { BabyMoLogo } from "./Header";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-20 bg-grass-50/70 backdrop-blur">
      <div className="container-soft py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <BabyMoLogo size="lg" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">
              {t.footer_tagline}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-grass-700">
              {t.footer_shop}
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-ink-600">
              <li><Link href="/products" className="hover:text-grass-600">{t.footer_shop_all}</Link></li>
              <li><Link href="/categories/emotional-journals" className="hover:text-grass-600">Journals</Link></li>
              <li><Link href="/categories/mood-stickers" className="hover:text-grass-600">Stickers</Link></li>
              <li><Link href="/categories/self-care-kits" className="hover:text-grass-600">Self-care</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-grass-700">
              {t.footer_help}
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-ink-600">
              <li><Link href="/#faq" className="hover:text-grass-600">{t.nav_faq}</Link></li>
              <li><Link href="/#shipping" className="hover:text-grass-600">{t.footer_help_shipping}</Link></li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  className="hover:text-grass-600"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.footer_help_wa}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-grass-700">
              {t.footer_stay}
            </h4>
            <p className="text-sm text-ink-600">{t.footer_stay_sub}</p>
            <div className="mt-3 flex gap-2">
              <a className="chip-orange" href="https://instagram.com/babymo.id">Instagram</a>
              <a className="chip" href="https://tiktok.com/@babymo.id">TikTok</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-grass-100 pt-6 text-xs text-ink-400 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Baby Mo. {t.footer_rights}</p>
          <p>{t.footer_motto}</p>
        </div>
      </div>
    </footer>
  );
}
