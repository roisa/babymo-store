"use client";

import { useCallback, useEffect, useState } from "react";
import {
  WISHLIST_EVENT,
  isWishlisted,
  readWishlist,
  toggleWishlist,
} from "@/lib/wishlist";

/**
 * Returns whether a single product is currently wishlisted, plus a
 * `toggle()` that flips it. Stays in sync across tabs/components via
 * the storage and babymo:wishlist-updated events.
 */
export function useWishlistItem(productId: string) {
  const [wished, setWished] = useState(false);

  useEffect(() => {
    setWished(isWishlisted(productId));
    const sync = () => setWished(isWishlisted(productId));
    window.addEventListener(WISHLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(WISHLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [productId]);

  const toggle = useCallback(() => {
    const next = toggleWishlist(productId);
    setWished(next.has(productId));
  }, [productId]);

  return { wished, toggle };
}

/** Live count of all wishlisted products (for header badge etc.). */
export function useWishlistCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(readWishlist().size);
    const sync = () => setCount(readWishlist().size);
    window.addEventListener(WISHLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(WISHLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return count;
}
