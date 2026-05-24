"use client";

import { useEffect, useState } from "react";

const QUOTES = [
  "you are doing more than you think you are.",
  "softness is also strength.",
  "your feelings deserve a safe little space.",
  "small days matter too.",
  "be the friend you needed.",
  "rest is allowed. always.",
];

const COLORS = [
  "bg-pinky-100",
  "bg-lavender-100",
  "bg-cream-100",
  "bg-beige-100",
];

export default function QuoteCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-12">
      <div className="container-soft">
        <div
          className={`relative overflow-hidden rounded-[2rem] p-8 transition-colors duration-700 sm:p-14 ${COLORS[i % COLORS.length]}`}
        >
          <span className="absolute -left-4 top-4 text-7xl text-white/60 select-none">"</span>
          <div className="relative">
            <p
              key={i}
              className="animate-fade-in font-display text-2xl leading-snug text-ink-900 sm:text-4xl"
            >
              {QUOTES[i]}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {QUOTES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Quote ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-6 bg-ink-900" : "w-1.5 bg-ink-900/20"
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
