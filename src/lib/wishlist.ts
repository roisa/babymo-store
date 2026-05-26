/**
 * localStorage-backed wishlist (product IDs).
 * Persists hearts on ProductCard across reloads & syncs across tabs.
 */

const KEY = "babymo:wishlist:v1";
export const WISHLIST_EVENT = "babymo:wishlist-updated";

function readSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? (arr as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeSet(set: Set<string>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify([...set]));
  window.dispatchEvent(new CustomEvent(WISHLIST_EVENT));
}

export function readWishlist(): Set<string> {
  return readSet();
}

export function toggleWishlist(productId: string): Set<string> {
  const set = readSet();
  if (set.has(productId)) set.delete(productId);
  else set.add(productId);
  writeSet(set);
  return set;
}

export function isWishlisted(productId: string): boolean {
  return readSet().has(productId);
}
