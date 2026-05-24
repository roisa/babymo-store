"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import WordRotator from "./WordRotator";
import AnimatedCounter from "./AnimatedCounter";
import AuroraCanvas from "./AuroraCanvas";

export default function Hero() {
  const { t, lang } = useLang();

  const rotatorWords =
    lang === "id"
      ? ["lembut", "hangat", "tenang", "sederhana"]
      : ["soft", "warm", "calm", "simple"];

  const subjectBefore =
    lang === "id" ? "Kenyamanan kecil yang" : "Small comforts that feel";
  const subjectAfter =
    lang === "id" ? "untuk hari-hari kamu." : "for your every day.";

  return (
    <section className="relative overflow-hidden px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative overflow-hidden rounded-ios-4xl shadow-ios-xl ring-1 ring-ink-900/5">
        {/* warm cream backdrop */}
        <div className="absolute inset-0 bg-hero-cream" />
        {/* live Canvas aurora — drifts smoothly, pauses off-screen */}
        <AuroraCanvas />

        {/* gentle floating particles for foreground depth */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-white/70 shadow-sm animate-float motion-reduce:animate-none"
            style={{
              top: p.top,
              left: p.left,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}

        <div className="container-soft relative grid items-center gap-10 py-16 sm:py-20 md:grid-cols-[1.1fr_1fr] md:py-24">
          <div className="relative animate-fade-in">
            <span className="chip-frost mb-6 inline-flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-grass-400 animate-pulse-soft" />
                <span className="absolute inset-0 rounded-full bg-grass-400" />
              </span>
              {t.hero_eyebrow}
            </span>

            <h1 className="font-display text-[2.5rem] font-bold leading-[1.04] tracking-[-0.035em] text-ink-900 sm:text-[3.25rem] md:text-[4rem]">
              {subjectBefore}{" "}
              <span className="text-grass-600">
                <WordRotator words={rotatorWords} />
              </span>{" "}
              {subjectAfter}
            </h1>

            <p className="mt-6 max-w-md text-[16px] leading-[1.55] text-ink-600">
              {t.hero_subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <Link
                href="/products"
                className="btn-primary text-[15px] px-6 py-3.5"
              >
                {t.hero_cta_shop}
                <Arrow />
              </Link>
              <Link
                href="/#bestsellers"
                className="btn-soft text-[15px] px-6 py-3.5"
              >
                {t.hero_cta_best}
              </Link>
            </div>

            {/* animated stats */}
            <div className="mt-9 grid max-w-md grid-cols-3 gap-4">
              <Stat
                value={
                  <AnimatedCounter
                    to={12483}
                    suffix="+"
                    className="font-display text-[1.5rem] font-bold tracking-tight text-ink-900"
                  />
                }
                label={lang === "id" ? "pesanan dikirim" : "orders shipped"}
              />
              <Stat
                value={
                  <span className="font-display text-[1.5rem] font-bold tracking-tight text-ink-900">
                    <AnimatedCounter to={49} format={(n) => (n / 10).toFixed(1)} />
                  </span>
                }
                label={lang === "id" ? "rating rata-rata" : "average rating"}
              />
              <Stat
                value={
                  <AnimatedCounter
                    to={98}
                    suffix="%"
                    className="font-display text-[1.5rem] font-bold tracking-tight text-ink-900"
                  />
                }
                label={
                  lang === "id" ? "pelanggan puas" : "happy customers"
                }
              />
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
              <div className="absolute inset-0 overflow-hidden rounded-ios-3xl ring-1 ring-ink-900/8 shadow-ios-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[8s] ease-spring hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1559563458-527698bf5295?w=900&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/35 via-ink-900/0 to-ink-900/0" />
              </div>

              <div className="absolute -bottom-5 left-3 right-3 rounded-ios-xl glass-thick p-4 animate-slide-up">
                <p className="font-display text-[15px] font-semibold leading-snug text-ink-900">
                  &ldquo;{t.hero_quote}&rdquo;
                </p>
                <p className="mt-1 text-[11px] font-medium text-ink-400">
                  {t.hero_quote_author}
                </p>
              </div>

              <div className="absolute -top-3 right-2 rounded-full glass-thick px-3 py-1.5 animate-float">
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

const PARTICLES = [
  { top: "12%", left: "8%", delay: 0, duration: 5 },
  { top: "30%", left: "92%", delay: 1.4, duration: 6.5 },
  { top: "72%", left: "12%", delay: 2.2, duration: 7 },
  { top: "50%", left: "55%", delay: 0.8, duration: 5.5 },
  { top: "85%", left: "78%", delay: 3, duration: 6 },
  { top: "20%", left: "45%", delay: 4, duration: 7.5 },
];

function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      {value}
      <p className="mt-0.5 text-[11px] font-medium text-ink-400">{label}</p>
    </div>
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
