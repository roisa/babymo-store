"use client";

import { useEffect } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

/**
 * Fullscreen image viewer with prev/next buttons + keyboard support.
 * Locks body scroll while open. Click backdrop or press ESC to close.
 */
export default function Lightbox({
  images,
  index,
  alt,
  onClose,
  onIndexChange,
}: Props) {
  const hasMany = images.length > 1;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasMany)
        onIndexChange((index - 1 + images.length) % images.length);
      else if (e.key === "ArrowRight" && hasMany)
        onIndexChange((index + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [hasMany, images.length, index, onClose, onIndexChange]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[60] flex animate-fade-in flex-col items-center justify-center bg-ink-900/85 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute right-4 top-[calc(env(safe-area-inset-top)+1rem)] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xl transition hover:bg-white/25"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative flex h-full w-full items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[85vh] w-full max-w-3xl">
          <Image
            src={images[index]}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-contain"
            priority
          />
        </div>

        {hasMany && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIndexChange((index - 1 + images.length) % images.length);
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xl transition hover:bg-white/25"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIndexChange((index + 1) % images.length);
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xl transition hover:bg-white/25"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dot indicator */}
      {hasMany && (
        <div className="absolute bottom-[calc(env(safe-area-inset-bottom)+1rem)] flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIndexChange(i);
              }}
              aria-label={`Image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
