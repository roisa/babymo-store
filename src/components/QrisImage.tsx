"use client";

import { useState } from "react";

/**
 * Renders the merchant's real QRIS code if available; otherwise a
 * decorative SVG placeholder so the payment page still looks finished.
 *
 * Resolution order (first one that succeeds wins):
 *   1. NEXT_PUBLIC_QRIS_IMAGE_URL  — any absolute URL (Supabase / CDN)
 *   2. /qris.png                   — drop the file in /public, no env needed
 *   3. /qris.jpg                   — same idea, .jpg variant
 *   4. SVG placeholder             — designed look-alike, never broken
 *
 * To go live, do ONE of:
 *   - drop `public/qris.png` into the repo and redeploy, OR
 *   - upload the QR to Supabase Storage / Cloudinary and set
 *     `NEXT_PUBLIC_QRIS_IMAGE_URL=https://…` on Vercel and redeploy.
 */

const ENV_URL =
  process.env.NEXT_PUBLIC_QRIS_IMAGE_URL?.trim() || undefined;

// Tried in order until one loads. Add more candidates here if needed.
const CANDIDATES = [ENV_URL, "/qris.png", "/qris.jpg"].filter(
  (u): u is string => Boolean(u),
);

export default function QrisImage() {
  const [idx, setIdx] = useState(0);
  const [allFailed, setAllFailed] = useState(CANDIDATES.length === 0);

  if (allFailed) {
    return <QrisPlaceholder />;
  }

  return (
    // Plain <img> on purpose: avoids next/image remote-pattern config for
    // arbitrary env URLs, and the QR doesn't benefit from optimization.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={CANDIDATES[idx]}
      alt="QRIS code"
      className="h-44 w-44 object-contain"
      onError={() => {
        if (idx + 1 < CANDIDATES.length) {
          setIdx(idx + 1);
        } else {
          setAllFailed(true);
        }
      }}
    />
  );
}

/** Decorative QRIS look-alike — used while no real QR is configured. */
function QrisPlaceholder() {
  return (
    <svg viewBox="0 0 100 100" className="h-40 w-40" aria-hidden>
      {Array.from({ length: 12 }).map((_, y) =>
        Array.from({ length: 12 }).map((__, x) => {
          const v = (x * 7 + y * 13 + x * y) % 5;
          const filled = v < 2 || (x + y) % 6 === 0;
          if (!filled) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x * 8 + 2}
              y={y * 8 + 2}
              width="7"
              height="7"
              rx="1"
              fill="#162818"
            />
          );
        }),
      )}
      {[
        [2, 2],
        [74, 2],
        [2, 74],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <rect x={cx} y={cy} width="24" height="24" rx="4" fill="#178533" />
          <rect x={cx + 4} y={cy + 4} width="16" height="16" rx="2" fill="#fff" />
          <rect x={cx + 8} y={cy + 8} width="8" height="8" rx="1" fill="#178533" />
        </g>
      ))}
    </svg>
  );
}
