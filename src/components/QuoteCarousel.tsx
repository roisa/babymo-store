"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";

const QUOTES = {
  id: [
    "kamu sudah melakukan lebih banyak dari yang kamu pikir.",
    "kelembutan juga adalah kekuatan.",
    "perasaanmu pantas mendapat ruang yang aman.",
    "hari-hari kecil juga berarti.",
    "jadi teman yang dulu kamu butuhkan.",
    "istirahat itu diperbolehkan, selalu.",
  ],
  en: [
    "you are doing more than you think you are.",
    "softness is also strength.",
    "your feelings deserve a safe little space.",
    "small days matter too.",
    "be the friend you needed.",
    "rest is allowed. always.",
  ],
};

const INTERVAL = 5200;

export default function QuoteCarousel() {
  const { lang } = useLang();
  const quotes = QUOTES[lang];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [minH, setMinH] = useState<number | undefined>();

  // measure tallest quote to lock height & avoid layout shift between rotations
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    let max = 0;
    for (const q of quotes) {
      el.textContent = `“${q}”`;
      max = Math.max(max, el.offsetHeight);
    }
    el.textContent = "";
    setMinH(max);
  }, [quotes]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), INTERVAL);
    return () => clearInterval(id);
  }, [quotes.length, paused]);

  return (
    <section className="py-12">
      <div className="container-soft">
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative overflow-hidden rounded-ios-3xl bg-grass-fade p-10 shadow-ios-lg sm:p-16"
        >
          {/* soft aurora overlay */}
          <div className="absolute inset-0 bg-aurora opacity-50" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <span className="chip-frost mb-5 inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-sunny-300" />
              {lang === "id" ? "pengingat lembut" : "soft reminder"}
            </span>

            {/* hidden measurer (same typography) used to lock height */}
            <p
              ref={measureRef}
              aria-hidden
              className="pointer-events-none invisible absolute font-display text-[26px] font-semibold leading-snug tracking-[-0.025em] sm:text-[40px]"
            />

            {/* stacked, cross-fading quotes — all mounted at once so the
                outgoing and incoming quote actually animate against each other */}
            <div
              className="relative"
              style={minH ? { minHeight: `${minH}px` } : undefined}
            >
              {quotes.map((q, idx) => {
                const active = idx === i;
                return (
                  <p
                    key={idx}
                    aria-hidden={!active}
                    className={`absolute inset-0 font-display text-[26px] font-semibold leading-snug tracking-[-0.025em] text-white transition-all duration-700 ease-spring sm:text-[40px] ${
                      active
                        ? "translate-y-0 opacity-100 blur-0"
                        : "pointer-events-none -translate-y-2 opacity-0 blur-[2px]"
                    }`}
                  >
                    &ldquo;{q}&rdquo;
                  </p>
                );
              })}
            </div>

            <div className="mt-7 flex items-center gap-1.5">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Quote ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-spring ${
                    idx === i ? "w-6 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
