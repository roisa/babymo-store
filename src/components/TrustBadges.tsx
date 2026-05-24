"use client";

import { useLang } from "@/context/LanguageContext";

const BADGES = {
  id: [
    { icon: "🌱", title: "Dipilih dengan hati", text: "setiap produk diuji tim kami" },
    { icon: "💌", title: "Cinta dalam tiap box", text: "dibungkus lembut, dipack dengan cinta" },
    { icon: "📦", title: "Packing hari sama", text: "sebelum 15.00 WIB (hari kerja)" },
    { icon: "💬", title: "Bantuan WhatsApp", text: "manusia sungguhan, hangat sungguhan" },
  ],
  en: [
    { icon: "🌱", title: "Handpicked & curated", text: "every product, tested by our team" },
    { icon: "💌", title: "Care in every box", text: "wrapped softly, packed with love" },
    { icon: "📦", title: "Same-day packing", text: "before 3pm WIB on weekdays" },
    { icon: "💬", title: "WhatsApp support", text: "real humans, real warmth" },
  ],
};

export default function TrustBadges() {
  const { lang } = useLang();
  return (
    <section id="shipping" className="py-10">
      <div className="container-soft">
        <div className="grid grid-cols-2 gap-3 rounded-3xl bg-white p-4 shadow-card ring-2 ring-grass-100 sm:grid-cols-4 sm:p-6">
          {BADGES[lang].map((b) => (
            <div key={b.title} className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-grass-50 text-lg ring-2 ring-grass-100">
                {b.icon}
              </span>
              <div>
                <p className="text-sm font-bold text-ink-900">{b.title}</p>
                <p className="text-[11px] text-ink-400">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
