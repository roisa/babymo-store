"use client";

import { SectionHeader } from "./CategoryGrid";
import { useLang } from "@/context/LanguageContext";

const TESTIMONIALS = {
  id: [
    {
      name: "Rina",
      location: "Surabaya",
      text: "Anakku jadi lebih suka belajar dengan santai. Buku aktivitasnya jadi ritual sore favorit kami sekarang.",
    },
    {
      name: "Dita",
      location: "Bandung",
      text: "Rasanya seperti punya quality time yang hangat. Pelan-pelan tapi penuh.",
    },
    {
      name: "Maya",
      location: "Jakarta",
      text: "Flashcard-nya bikin belajar terasa lebih lembut — anakku malah yang minta lanjut.",
    },
    {
      name: "Sarah",
      location: "Yogyakarta",
      text: "Buku ceritanya jadi ritual sebelum tidur favorit kami. Kualitas kertasnya juga lembut di tangan.",
    },
  ],
  en: [
    {
      name: "Rina",
      location: "Surabaya",
      text: "My little one actually enjoys learning at her own pace now. The activity book became our favourite afternoon ritual.",
    },
    {
      name: "Dita",
      location: "Bandung",
      text: "It feels like having a warm quality time together. Slow but full.",
    },
    {
      name: "Maya",
      location: "Jakarta",
      text: "The flashcards make learning feel gentle — she's the one asking to keep going.",
    },
    {
      name: "Sarah",
      location: "Yogyakarta",
      text: "The storybook is now our favourite bedtime ritual. The paper feels soft in our hands too.",
    },
  ],
};

export default function Testimonials() {
  const { lang, t } = useLang();
  const list = TESTIMONIALS[lang];

  return (
    <section className="py-16 sm:py-20">
      <div className="container-soft">
        <SectionHeader
          eyebrow={t.section_testimonials_eyebrow}
          title={t.section_testimonials_title}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((item) => (
            <figure
              key={item.name}
              className="rounded-ios-2xl bg-white p-5 ring-1 ring-ink-900/[0.06] shadow-ios transition hover:-translate-y-0.5 hover:shadow-ios-lg"
            >
              <div className="flex gap-0.5 text-tangerine-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="text-[13px]">
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-3 text-[14px] leading-relaxed text-ink-900">
                &ldquo;{item.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[12px] text-ink-400">
                <span className="font-semibold text-ink-700">{item.name}</span>{" "}
                · {item.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
