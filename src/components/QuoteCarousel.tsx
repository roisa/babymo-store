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

export default function QuoteCarousel() {
  const { lang } = useLang();
  const quotes = QUOTES[lang];
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 4500);
    return () => clearInterval(id);
  }, [quotes.length]);

  return (
    <section className="py-12">
      <div className="container-soft">
        <div className="relative overflow-hidden rounded-ios-3xl bg-grass-fade p-10 shadow-ios-lg sm:p-16">
          {/* aurora overlay */}
          <div className="absolute inset-0 bg-aurora opacity-50" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <span className="chip-frost mb-5 inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-sunny-300" />
              {lang === "id" ? "pengingat lembut" : "soft reminder"}
            </span>
            <p
              key={i}
              className="animate-fade-in font-display text-[26px] font-semibold leading-snug tracking-[-0.025em] text-white sm:text-[40px]"
            >
              &ldquo;{quotes[i]}&rdquo;
            </p>
            <div className="mt-7 flex items-center gap-1.5">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Quote ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ease-spring ${
                    idx === i ? "w-7 bg-white" : "w-1.5 bg-white/35"
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
