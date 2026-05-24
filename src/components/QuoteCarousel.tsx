"use client";

import { useEffect, useState } from "react";
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

const COLORS = [
  "bg-grass-100",
  "bg-tangerine-100",
  "bg-sunny-200",
  "bg-cream-100",
];

export default function QuoteCarousel() {
  const { lang } = useLang();
  const quotes = QUOTES[lang];
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 4200);
    return () => clearInterval(id);
  }, [quotes.length]);

  return (
    <section className="py-12">
      <div className="container-soft">
        <div
          className={`relative overflow-hidden rounded-[2rem] p-8 ring-2 ring-grass-100 transition-colors duration-700 sm:p-14 ${COLORS[i % COLORS.length]}`}
        >
          <span className="absolute -left-2 top-2 select-none text-8xl text-white/70">
            &ldquo;
          </span>
          <div className="relative">
            <p
              key={i}
              className="animate-fade-in font-display text-2xl font-bold leading-snug text-ink-900 sm:text-4xl"
            >
              {quotes[i]}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Quote ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === i ? "w-8 bg-grass-600" : "w-2 bg-grass-600/30"
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
