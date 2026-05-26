"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` for ~600ms whenever the cart receives a new item.
 * Wire it to a Tailwind class to play a tiny bump/shake animation.
 */
export function useCartBump(durationMs = 600): boolean {
  const [bumped, setBumped] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const handler = () => {
      setBumped(true);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setBumped(false), durationMs);
    };
    window.addEventListener("babymo:cart-bumped", handler);
    return () => {
      window.removeEventListener("babymo:cart-bumped", handler);
      if (timer) clearTimeout(timer);
    };
  }, [durationMs]);
  return bumped;
}
