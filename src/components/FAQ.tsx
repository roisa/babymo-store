"use client";

import { useState } from "react";
import { SectionHeader } from "./CategoryGrid";

const FAQS = [
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
    a: "Tentu boleh 🌷 Tambahkan catatan pengiriman saat checkout, dan kami bungkus dengan ekstra cinta.",
  },
  {
    q: "Bagaimana kalau ada produk yang rusak saat diterima?",
    a: "Hubungi kami via WhatsApp dalam 2x24 jam setelah paket diterima. Sertakan foto dan video unboxing — kami pasti bantu sebaik mungkin.",
  },
  {
    q: "Apakah ada produk digital?",
    a: "Iya! Wallpaper, printable journaling pages, dan self care bundle kami akan dikirim ke WhatsApp/email kamu sesaat setelah pembayaran terverifikasi.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-14">
      <div className="container-soft max-w-3xl">
        <SectionHeader
          eyebrow="frequently asked"
          title="Soft answers to your questions."
          align="center"
        />

        <div className="mt-8 space-y-3">
          {FAQS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink-900/5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-ink-900">{q}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream-100 text-ink-600 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm leading-relaxed text-ink-600">{a}</p>
        </div>
      </div>
    </div>
  );
}
