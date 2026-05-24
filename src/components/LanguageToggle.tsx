"use client";

import { useLang } from "@/context/LanguageContext";

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`inline-flex items-center rounded-full bg-white p-0.5 ring-2 ring-grass-200 ${
        compact ? "scale-90" : ""
      }`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("id")}
        aria-pressed={lang === "id"}
        className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
          lang === "id"
            ? "bg-grass-400 text-white shadow-sm"
            : "text-ink-600 hover:text-ink-900"
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
          lang === "en"
            ? "bg-grass-400 text-white shadow-sm"
            : "text-ink-600 hover:text-ink-900"
        }`}
      >
        EN
      </button>
    </div>
  );
}
