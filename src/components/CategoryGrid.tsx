"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/products";
import { useLang } from "@/context/LanguageContext";

export default function CategoryGrid() {
  const { t } = useLang();
  return (
    <section className="py-12">
      <div className="container-soft">
        <SectionHeader
          eyebrow={t.section_categories_eyebrow}
          title={t.section_categories_title}
          subtitle={t.section_categories_subtitle}
        />

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 hide-scrollbar sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible lg:grid-cols-5">
          {CATEGORIES.slice(0, 10).map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative flex min-w-[140px] flex-col items-start gap-2 rounded-3xl bg-white p-5 shadow-card ring-2 ring-grass-100 transition-all hover:-translate-y-1 hover:shadow-pop hover:ring-grass-300"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-grass-50 text-2xl ring-2 ring-grass-100 transition group-hover:bg-tangerine-100 group-hover:ring-tangerine-200">
                {cat.emoji}
              </span>
              <h3 className="mt-2 text-sm font-bold leading-snug text-ink-900">
                {cat.name}
              </h3>
              <p className="text-[11px] leading-snug text-ink-400 line-clamp-2">
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
        <span className="chip mb-3 inline-flex uppercase tracking-wider">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-xl text-sm text-ink-600">{subtitle}</p>
      )}
    </div>
  );
}
