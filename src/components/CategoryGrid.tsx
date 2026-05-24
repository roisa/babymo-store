"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/products";
import { useLang } from "@/context/LanguageContext";
import Reveal from "./Reveal";

export default function CategoryGrid() {
  const { t } = useLang();
  return (
    <section className="py-14 sm:py-16">
      <div className="container-soft">
        <Reveal>
          <SectionHeader
            eyebrow={t.section_categories_eyebrow}
            title={t.section_categories_title}
            subtitle={t.section_categories_subtitle}
          />
        </Reveal>

        {/* mobile: edge-to-edge horizontal scroll with proper end padding + fade hint
            desktop: grid */}
        <div className="relative mt-10 sm:hidden">
          <div className="-mx-5 overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex gap-3 px-5 pr-10">
              {CATEGORIES.slice(0, 10).map((cat, i) => (
                <CategoryCard key={cat.slug} cat={cat} index={i} />
              ))}
            </div>
          </div>
          {/* right fade — hint that there's more to scroll */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-warmwhite to-transparent" />
        </div>

        <div className="mt-10 hidden gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.slice(0, 10).map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 40}>
              <CategoryCard cat={cat} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof CATEGORIES)[number];
  index: number;
}) {
  // Cycle bg color through a few brand-soft tones for visual rhythm
  const bgClasses = [
    "bg-grass-50 ring-grass-100 group-hover:bg-tangerine-50 group-hover:ring-tangerine-100",
    "bg-tangerine-50 ring-tangerine-100 group-hover:bg-grass-50 group-hover:ring-grass-100",
    "bg-sunny-200/40 ring-sunny-300/40 group-hover:bg-grass-50 group-hover:ring-grass-100",
  ];
  return (
    <Link
      href={`/categories/${cat.slug}`}
      className="group relative flex h-full w-[150px] shrink-0 flex-col items-start gap-2 rounded-ios-2xl bg-white p-5 ring-1 ring-ink-900/[0.06] shadow-ios transition-all duration-300 ease-spring hover:-translate-y-1 hover:shadow-ios-lg sm:w-auto"
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-ios text-xl ring-1 transition ${bgClasses[index % bgClasses.length]}`}
      >
        {cat.emoji}
      </span>
      <h3 className="mt-1 text-[14px] font-semibold leading-snug tracking-[-0.01em] text-ink-900">
        {cat.name}
      </h3>
      <p className="line-clamp-2 text-[11.5px] leading-snug text-ink-400">
        {cat.description}
      </p>
    </Link>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <span
          className={`chip ${
            align === "center" ? "mx-auto " : ""
          }mb-4 inline-flex uppercase tracking-[0.12em]`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[1.875rem] font-bold tracking-[-0.025em] text-ink-900 sm:text-[2.25rem]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`${
            align === "center" ? "mx-auto " : ""
          }mt-3 max-w-xl text-[15px] leading-relaxed text-ink-600`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
