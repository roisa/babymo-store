"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function Hero() {
  const { t, lang } = useLang();

  // Split title to highlight one word in green
  const titleParts =
    lang === "id"
      ? { before: "Kenyamanan kecil", highlight: "untuk hari-hari", after: "kamu." }
      : { before: "Small comforts for", highlight: "your everyday", after: "moments." };

  return (
    <section className="relative overflow-hidden px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative overflow-hidden rounded-ios-4xl bg-hero-cream shadow-ios-xl ring-1 ring-ink-900/5">
        {/* aurora wash */}
        <div className="absolute inset-0 bg-aurora opacity-90" />
        {/* glass orbs */}
        <Orb className="-left-16 top-12 h-56 w-56 bg-grass-300/30" />
        <Orb className="-right-20 top-32 h-72 w-72 bg-tangerine-300/30" />
        <Orb className="bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 bg-sunny-300/25" />

        <div className="container-soft relative grid items-center gap-10 py-16 sm:py-20 md:grid-cols-[1.1fr_1fr] md:py-24">
          <div className="relative animate-fade-in">
            <span className="chip-frost mb-6 inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-grass-400" />
              {t.hero_eyebrow}
            </span>

            <h1 className="font-display text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] text-ink-900 sm:text-[3.5rem] md:text-[4.25rem]">
              {titleParts.before}{" "}
              <span className="text-grass-600">{titleParts.highlight}</span>{" "}
              {titleParts.after}
            </h1>

            <p className="mt-6 max-w-md text-[16px] leading-[1.55] text-ink-600">
              {t.hero_subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <Link href="/products" className="btn-primary text-[15px] px-6 py-3.5">
                {t.hero_cta_shop}
                <Arrow />
              </Link>
              <Link href="/#bestsellers" className="btn-soft text-[15px] px-6 py-3.5">
                {t.hero_cta_best}
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium text-ink-400">
              <Trust>{t.hero_trust_orders}</Trust>
              <span className="h-1 w-1 rounded-full bg-ink-200" />
              <Trust>{t.hero_trust_rating}</Trust>
              <span className="h-1 w-1 rounded-full bg-ink-200" />
              <Trust>{t.hero_trust_packing}</Trust>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
              {/* main "iOS widget" panel */}
              <div className="absolute inset-0 overflow-hidden rounded-ios-3xl ring-1 ring-ink-900/8 shadow-ios-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1559563458-527698bf5295?w=900&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/35 via-ink-900/0 to-ink-900/0" />
              </div>

              {/* floating glass quote card — iOS widget style */}
              <div className="absolute -bottom-5 left-3 right-3 rounded-ios-xl glass-thick p-4">
                <p className="font-display text-[15px] font-semibold leading-snug text-ink-900">
                  &ldquo;{t.hero_quote}&rdquo;
                </p>
                <p className="mt-1 text-[11px] font-medium text-ink-400">
                  {t.hero_quote_author}
                </p>
              </div>

              {/* small floating chip */}
              <div className="absolute -top-3 right-2 rounded-full glass-thick px-3 py-1.5">
                <p className="text-[11px] font-bold text-grass-700">
                  {lang === "id" ? "🌱 Halo!" : "🌱 Hi!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust({ children }: { children: React.ReactNode }) {
  return <span className="whitespace-nowrap">{children}</span>;
}

function Orb({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}

function Arrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
