"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function Hero() {
  const { t, lang } = useLang();

  // Title with one word highlighted in sunny yellow (Baby Mo signature look)
  const titleParts =
    lang === "id"
      ? {
          before: "Kenyamanan kecil untuk",
          highlight: "hari-hari",
          after: "kamu.",
        }
      : {
          before: "Small comforts for your",
          highlight: "everyday",
          after: "moments.",
        };

  return (
    <section className="relative overflow-hidden px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-hero-grass shadow-glow sm:rounded-[2.5rem]">
        <Sparkle className="left-6 top-10" />
        <Sparkle className="right-10 top-20" delay={400} />
        <Sparkle className="left-1/3 bottom-12" delay={900} />
        <Sparkle className="right-1/4 top-1/2" delay={1400} />
        <Cloud className="-left-10 top-6 opacity-50" />
        <Cloud className="-right-12 bottom-20 opacity-40" />

        <div className="container-soft relative grid items-center gap-8 py-12 sm:py-16 md:grid-cols-[1.05fr_1fr] md:py-20">
          <div className="relative animate-fade-in">
            <span className="chip-orange mb-5 inline-flex">
              <span className="text-[10px]">✨</span>
              {t.hero_eyebrow}
            </span>

            <h1 className="font-display text-[2.5rem] font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
              {titleParts.before}{" "}
              <span className="relative inline-block text-sunny-300">
                {titleParts.highlight}
                <SquiggleUnderline />
              </span>{" "}
              {titleParts.after}
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-white/90">
              {t.hero_subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn-orange text-base">
                {t.hero_cta_shop}
                <Arrow />
              </Link>
              <Link
                href="/#bestsellers"
                className="btn bg-white text-grass-700 shadow-pop hover:-translate-y-0.5 hover:bg-grass-50"
              >
                {t.hero_cta_best}
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-white/90">
              <span>{t.hero_trust_orders}</span>
              <span>{t.hero_trust_rating}</span>
              <span>{t.hero_trust_packing}</span>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <div className="absolute inset-0 animate-[spin_30s_linear_infinite]">
                <Sunburst />
              </div>
              <div className="absolute inset-6 overflow-hidden rounded-[2rem] bg-tangerine-400 ring-4 ring-white shadow-pop-orange">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559563458-527698bf5295?w=900&q=80')] bg-cover bg-center mix-blend-luminosity opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-tangerine-500/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-2 right-2 animate-float rounded-2xl bg-white px-3 py-2 shadow-pop ring-2 ring-grass-200">
                <p className="font-display text-xs font-bold text-grass-700">
                  {lang === "id" ? "Halo, teman! 🌱" : "Hi, friend! 🌱"}
                </p>
              </div>
              <div className="absolute -bottom-3 left-2 right-2 rounded-2xl bg-white px-4 py-3 shadow-pop ring-2 ring-grass-100">
                <p className="font-display text-sm leading-snug text-ink-900">
                  &ldquo;{t.hero_quote}&rdquo;
                </p>
                <p className="mt-1 text-[11px] font-semibold text-ink-400">
                  {t.hero_quote_author}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sparkle({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      className={`pointer-events-none absolute h-5 w-5 text-sunny-300 ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ animation: `float 3s ease-in-out ${delay}ms infinite` }}
    >
      <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5L12 0z" />
    </svg>
  );
}

function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute h-24 w-40 text-white/30 ${className}`}
      viewBox="0 0 200 100"
      fill="currentColor"
    >
      <ellipse cx="60" cy="60" rx="40" ry="30" />
      <ellipse cx="110" cy="50" rx="50" ry="35" />
      <ellipse cx="150" cy="65" rx="35" ry="25" />
    </svg>
  );
}

function Sunburst() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i * 360) / 18;
        return (
          <rect
            key={i}
            x="98"
            y="0"
            width="4"
            height="22"
            rx="2"
            fill="#FFD93D"
            opacity="0.6"
            transform={`rotate(${angle} 100 100)`}
          />
        );
      })}
    </svg>
  );
}

function SquiggleUnderline() {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 h-2 w-full text-tangerine-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    >
      <path d="M2 6 Q 25 0 50 6 T 100 6 T 150 6 T 198 6" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
