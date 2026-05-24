"use client";

import { SectionHeader } from "./CategoryGrid";
import { useLang } from "@/context/LanguageContext";
import { SOCIAL } from "@/lib/social";

const SHOTS = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
  "https://images.unsplash.com/photo-1602874801007-aa377efa0bc4?w=600&q=80",
  "https://images.unsplash.com/photo-1559563458-527698bf5295?w=600&q=80",
  "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80",
  "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&q=80",
  "https://images.unsplash.com/photo-1620421680010-0766ff230392?w=600&q=80",
];

export default function InstagramGallery() {
  const { t } = useLang();
  return (
    <section className="py-16 sm:py-20">
      <div className="container-soft">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="@babymo.official"
            title={t.section_ig_title}
          />
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noreferrer"
            className="hidden text-[13px] font-semibold text-grass-700 hover:text-grass-800 sm:inline"
          >
            {t.section_ig_cta}
          </a>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
          {SHOTS.map((src, i) => (
            <a
              key={i}
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-ios bg-ink-900/[0.04] ring-1 ring-ink-900/6 transition hover:-translate-y-0.5 hover:shadow-ios-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Baby Mo on Instagram ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 ease-spring group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink-900/0 transition group-hover:bg-ink-900/15" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
