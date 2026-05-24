"use client";

import { useState } from "react";
import { SectionHeader } from "./CategoryGrid";
import { useLang } from "@/context/LanguageContext";

const FAQS = {
  id: [
    {
      q: "Berapa lama pesanan saya akan diproses?",
      a: "Pesanan yang sudah verified akan kami packing di hari kerja yang sama (sebelum jam 3 sore WIB) atau keesokan harinya. Estimasi sampai 2–5 hari kerja, tergantung kota tujuan.",
    },
    {
      q: "Apa metode pembayarannya?",
      a: "Saat ini kami menggunakan QRIS dan transfer manual. Nominal pembayaran sedikit unik (mis. Rp89.237) supaya tim kami bisa mencocokkan pembayaran dengan cepat.",
    },
    {
      q: "Apakah produknya bisa dijadikan hadiah?",
      a: "Tentu boleh 🌱 Tambahkan catatan pengiriman saat checkout, dan kami bungkus dengan ekstra cinta.",
    },
    {
      q: "Bagaimana kalau ada produk yang rusak saat diterima?",
      a: "Hubungi kami via WhatsApp dalam 2x24 jam setelah paket diterima. Sertakan foto dan video unboxing — kami pasti bantu sebaik mungkin.",
    },
    {
      q: "Apakah ada produk digital?",
      a: "Iya! Wallpaper, printable journaling pages, dan self care bundle kami akan dikirim ke WhatsApp/email kamu sesaat setelah pembayaran terverifikasi.",
    },
  ],
  en: [
    {
      q: "How long does my order take to process?",
      a: "Verified orders are packed the same business day (before 3pm WIB) or the next morning. Delivery takes 2–5 working days depending on destination.",
    },
    {
      q: "What are the payment methods?",
      a: "We use QRIS and manual bank transfer. The amount has a small unique code (e.g. Rp89,237) so our team can match your payment instantly.",
    },
    {
      q: "Can I send products as a gift?",
      a: "Of course 🌱 Add a delivery note at checkout, and we'll wrap it with extra love.",
    },
    {
      q: "What if my product arrives damaged?",
      a: "Reach us on WhatsApp within 2×24 hours of delivery. Attach unboxing photos/video — we'll always make it right.",
    },
    {
      q: "Do you have digital products?",
      a: "Yes! Wallpapers, printable journaling pages, and our self-care bundle are delivered to your WhatsApp/email moments after payment is verified.",
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
