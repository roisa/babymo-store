"use client";

import { useEffect, useState } from "react";

type Props = {
  words: string[];
  interval?: number;
  className?: string;
};

/**
 * Cycles through words in place with a subtle slide+fade transition.
 * Width auto-adjusts to the longest word so layout doesn't jitter.
 */
export default function WordRotator({
  words,
  interval = 2400,
  className = "",
}: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  // longest word reserves width to prevent layout shift
  const longest = words.reduce(
    (a, b) => (b.length > a.length ? b : a),
    words[0] ?? "",
  );

  return (
    <span className={`relative inline-grid align-baseline ${className}`}>
      <span aria-hidden className="invisible">
        {longest}
      </span>
      {words.map((w, idx) => (
        <span
          key={idx}
          className={`absolute inset-0 transition-all duration-500 ease-spring ${
            idx === i
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
          aria-hidden={idx !== i}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
