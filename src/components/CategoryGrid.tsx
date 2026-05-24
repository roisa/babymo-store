"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/products";
import { useLang } from "@/context/LanguageContext";

export default function CategoryGrid() {
  const { t } = useLang();
  return (
    <section className="py-14 sm:py-16">
      <div className="container-soft">
        <SectionHeader
          eyebrow={t.section_categories_eyebrow}
          title={t.section_categories_title}
          subtitle={t.section_categories_subtitle}
        />

        <div className="mt-10 flex gap-3 overflow-x-auto pb-2 hide-scrollbar sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible lg:grid-cols-5">
          {CATEGORIES.slice(0, 10).map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative flex min-w-[150px] flex-col items-start gap-2 rounded-ios-2xl bg-white p-5 ring-1 ring-ink-900/6 shadow-ios transition-all duration-300 ease-spring hover:-translate-y-1 hover:shadow-ios-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-ios bg-grass-50 text-xl ring-1 ring-grass-100 transition group-hover:bg-tangerine-50 group-hover:ring-tangerine-100">
                {cat.emoji}
              </span>
              <h3 className="mt-1 text-[14px] font-semibold leading-snug tracking-[-0.01em] text-ink-900">
                {cat.name}
              </h3>
              <p className="line-clamp-2 text-[11.5px] leading-snug text-ink-400">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
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
