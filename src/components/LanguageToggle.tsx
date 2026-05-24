"use client";

import { useLang } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      className="relative inline-flex h-9 items-center rounded-full bg-ink-900/[0.06] p-0.5 ring-1 ring-ink-900/8 backdrop-blur-xl"
      role="group"
      aria-label="Language"
    >
      <span
        className={`pointer-events-none absolute top-0.5 bottom-0.5 w-[34px] rounded-full bg-white shadow-ios transition-transform duration-300 ease-spring ${
          lang === "id" ? "translate-x-0" : "translate-x-[34px]"
        }`}
      />
      <button
        type="button"
        onClick={() => setLang("id")}
        aria-pressed={lang === "id"}
        className={`relative z-10 flex h-8 w-[34px] items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
          lang === "id" ? "text-ink-900" : "text-ink-400 hover:text-ink-600"
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`relative z-10 flex h-8 w-[34px] items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
          lang === "en" ? "text-ink-900" : "text-ink-400 hover:text-ink-600"
        }`}
      >
        EN
      </button>
    </div>
  );
}
