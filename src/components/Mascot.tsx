"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  size?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
  /** Optional 1-or-2-word badge attached on the side (e.g. "Halo!") */
  caption?: string;
  /** Drop shadow under the figure */
  float?: boolean;
};

/**
 * Baby Mo mascot. Pulls /mascot.png from public/ (optimised by
 * `npm run mascot:build`). If the file isn't there yet, gracefully
 * degrades to the existing green "M" tile so nothing looks broken.
 */
export default function Mascot({
  size = 128,
  className = "",
  alt = "Baby Mo",
  priority,
  caption,
  float,
}: Props) {
  const [errored, setErrored] = useState(false);

  return (
    <span
      className={`relative inline-flex items-center justify-center ${
        float ? "drop-shadow-xl" : ""
      } ${className}`}
      style={{ width: size, height: size }}
    >
      {errored ? (
        <span
          className="flex h-full w-full items-center justify-center rounded-2xl bg-grass-fade font-display font-bold text-white shadow-ios-grass"
          style={{ fontSize: size * 0.45 }}
          aria-label={alt}
        >
          M
        </span>
      ) : (
        <Image
          src="/mascot.png"
          alt={alt}
          width={size}
          height={size}
          priority={priority}
          onError={() => setErrored(true)}
          className="h-full w-full object-contain"
        />
      )}

      {caption && (
        <span className="absolute -top-2 right-0 translate-x-1/4 rounded-full glass-thick px-2.5 py-1 text-[10px] font-bold text-grass-700 shadow-ios">
          {caption}
        </span>
      )}
    </span>
  );
}
