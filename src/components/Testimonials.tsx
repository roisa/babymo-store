"use client";

import { SectionHeader } from "./CategoryGrid";
import { useLang } from "@/context/LanguageContext";

const TESTIMONIALS = {
  id: [
    {
      name: "Rana, 21",
      location: "Jakarta",
      text: "Bukunya cantik banget dan affirmation card-nya bener-bener bikin tenang waktu hari berat 🥹",
      color: "bg-grass-100",
    },
    {
      name: "Naomi, 26",
      location: "Bandung",
      text: "Packaging-nya bikin happy. Berasa unboxing hadiah dari diri sendiri ✨ love love love.",
      color: "bg-tangerine-100",
    },
    {
      name: "Salwa, 19",
      location: "Surabaya",
      text: "Mood sticker pack-nya lucu banget, tempel di laptop bikin kerja jadi lebih lembut rasanya.",
      color: "bg-sunny-200",
    },
    {
      name: "Kayla, 24",
      location: "Yogyakarta",
      text: "Worth every rupiah. Self care kit-nya jadi ritual mingguan favorit aku sekarang.",
      color: "bg-cream-100",
    },
  ],
  en: [
    {
      name: "Rana, 21",
      location: "Jakarta",
      text: "The journal is gorgeous and the affirmation cards genuinely calm me down on the hard days 🥹",
      color: "bg-grass-100",
    },
    {
      name: "Naomi, 26",
      location: "Bandung",
      text: "The packaging makes me happy. It really feels like unboxing a gift to myself ✨ love love love.",
      color: "bg-tangerine-100",
    },
    {
      name: "Salwa, 19",
      location: "Surabaya",
      text: "The mood sticker pack is so cute — sticking them on my laptop makes work feel a bit softer.",
      color: "bg-sunny-200",
    },
    {
      name: "Kayla, 24",
      location: "Yogyakarta",
      text: "Worth every rupiah. The self-care kit is my new weekly ritual.",
      color: "bg-cream-100",
    },
  ],
};

export default function Testimonials() {
  const { lang, t } = useLang();
  const list = TESTIMONIALS[lang];

  return (
    <section className="py-14">
      <div className="container-soft">
        <SectionHeader
          eyebrow={t.section_testimonials_eyebrow}
          title={t.section_testimonials_title}
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((item) => (
            <figure
              key={item.name}
              className={`rounded-3xl p-5 shadow-card ring-2 ring-grass-100 ${item.color}`}
            >
              <div className="flex gap-1 text-tangerine-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-ink-900">
                &ldquo;{item.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-xs font-semibold text-ink-600">
                <span className="font-bold">{item.name}</span> · {item.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
