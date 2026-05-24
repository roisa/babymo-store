"use client";

import { SectionHeader } from "./CategoryGrid";
import { useLang } from "@/context/LanguageContext";

const TESTIMONIALS = {
  id: [
    {
      name: "Rana, 21",
      location: "Jakarta",
      text: "Bukunya cantik banget dan affirmation card-nya bener-bener bikin tenang waktu hari berat 🥹",
    },
    {
      name: "Naomi, 26",
      location: "Bandung",
      text: "Packaging-nya bikin happy. Berasa unboxing hadiah dari diri sendiri ✨ love love love.",
    },
    {
      name: "Salwa, 19",
      location: "Surabaya",
      text: "Mood sticker pack-nya lucu banget, tempel di laptop bikin kerja jadi lebih lembut rasanya.",
    },
    {
      name: "Kayla, 24",
      location: "Yogyakarta",
      text: "Worth every rupiah. Self care kit-nya jadi ritual mingguan favorit aku sekarang.",
    },
  ],
  en: [
    {
      name: "Rana, 21",
      location: "Jakarta",
      text: "The journal is gorgeous and the affirmation cards genuinely calm me down on the hard days 🥹",
    },
    {
      name: "Naomi, 26",
      location: "Bandung",
      text: "The packaging makes me happy. It really feels like unboxing a gift to myself ✨ love love love.",
    },
    {
      name: "Salwa, 19",
      location: "Surabaya",
      text: "The mood sticker pack is so cute — sticking them on my laptop makes work feel a bit softer.",
    },
    {
      name: "Kayla, 24",
      location: "Yogyakarta",
      text: "Worth every rupiah. The self-care kit is my new weekly ritual.",
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
              className="rounded-ios-2xl bg-white p-5 ring-1 ring-ink-900/6 shadow-ios transition hover:-translate-y-0.5 hover:shadow-ios-lg"
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
