"use client";

import { useState } from "react";
import { SectionHeader } from "./CategoryGrid";
import { useLang } from "@/context/LanguageContext";
import { FAQS } from "@/lib/faqs";

export default function FAQ() {
  const { lang, t } = useLang();
  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="container-soft max-w-3xl">
        <SectionHeader
          eyebrow={t.section_faq_eyebrow}
          title={t.section_faq_title}
          align="center"
        />

        <div className="mt-10 overflow-hidden rounded-ios-2xl bg-white ring-1 ring-ink-900/6 shadow-ios">
          {FAQS[lang].map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              divider={i < FAQS[lang].length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  q,
  a,
  divider,
}: {
  q: string;
  a: string;
  divider: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={divider ? "border-b border-ink-900/[0.06]" : ""}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-ink-900/[0.02]"
        aria-expanded={open}
      >
        <span className="text-[14.5px] font-semibold tracking-[-0.01em] text-ink-900">
          {q}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-900/[0.06] font-semibold text-ink-700 transition-all duration-300 ease-spring ${
            open ? "rotate-45 bg-grass-fade text-white shadow-ios-grass" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-spring ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[14px] leading-relaxed text-ink-600">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}
