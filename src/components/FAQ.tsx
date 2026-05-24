"use client";

import { useState } from "react";
import { SectionHeader } from "./CategoryGrid";
import { useLang } from "@/context/LanguageContext";

const FAQS = {
  id: [
    {
      q: "Cocok untuk anak usia berapa?",
      a: "Sebagian besar produk kami dirancang untuk usia 0–7 tahun. Setiap halaman produk mencantumkan rentang usia yang ideal — kami juga sering memberi catatan tambahan dari tim Montessori kami.",
    },
    {
      q: "Bahan baju anaknya aman untuk kulit sensitif?",
      a: "Iya. Semua kaos kami pakai katun supima organik dengan jahitan rata dan label dari kain lembut — tidak menggesek kulit. Sudah melewati uji laboratorium tekstil.",
    },
    {
      q: "Apakah produknya bisa dijadikan hadiah?",
      a: "Tentu boleh 🌱 Tambahkan catatan saat checkout, dan kami bungkus dengan kertas pastel khas Baby Mo plus kartu ucapan tulisan tangan.",
    },
    {
      q: "Apakah ada produk digital seperti printable?",
      a: "Iya! Lembar kerja, halaman mewarnai, dan tracing pages dikirim ke email kamu dalam beberapa menit setelah pembayaran terverifikasi. Bisa dicetak berkali-kali untuk satu keluarga.",
    },
    {
      q: "Berapa lama pesanan saya diproses?",
      a: "Pesanan yang sudah verified kami packing di hari kerja yang sama (sebelum jam 15.00 WIB) atau keesokan harinya. Estimasi sampai 2–5 hari kerja, tergantung kota tujuan.",
    },
    {
      q: "Bagaimana kalau ada produk yang rusak saat diterima?",
      a: "Hubungi kami via WhatsApp dalam 2×24 jam setelah paket diterima. Sertakan foto dan video unboxing — kami pasti bantu sebaik mungkin.",
    },
  ],
  en: [
    {
      q: "What age range are these for?",
      a: "Most of our products are designed for ages 0–7. Each product page includes the ideal age range, often with a note from our Montessori team.",
    },
    {
      q: "Are the t-shirts safe for sensitive skin?",
      a: "Yes. Every tee is organic supima cotton with flat seams and soft fabric tags — nothing scratchy. Lab-tested for textile safety.",
    },
    {
      q: "Can I send products as a gift?",
      a: "Of course 🌱 Add a note at checkout and we'll wrap it in our pastel paper plus a handwritten card.",
    },
    {
      q: "Do you have digital products like printables?",
      a: "Yes! Worksheets, colouring sheets, and tracing pages are sent to your email moments after payment is verified — print as many times as you'd like for your family.",
    },
    {
      q: "How long does my order take to process?",
      a: "Verified orders are packed the same business day (before 3pm WIB) or the next morning. Delivery takes 2–5 working days depending on destination.",
    },
    {
      q: "What if a product arrives damaged?",
      a: "Reach us on WhatsApp within 2×24 hours of delivery. Attach unboxing photos or video — we'll always make it right.",
    },
  ],
};

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
