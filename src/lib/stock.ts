import type { CartItem } from "@/types";

/**
 * Client-side stock override store.
 *
 * Each entry in the overrides map records how many units of a product
 * have been "consumed" by approved orders since the catalog was last
 * built. Effective stock = `base stock from products.ts − override`.
 *
 * Persists in localStorage and syncs across tabs via the `storage`
 * event + a custom "babymo:stock-updated" event.
 *
 * Why client-side: until Supabase is wired, the catalog ships as
 * static data in `src/lib/products.ts`, so the only place we can
 * mutate stock at runtime is on the admin's device. This is enough
 * to keep the admin's view honest as they process the day's orders.
 *
 * Phase 2 (when Supabase is set up): wrap `decrementStockFor()` to
 * also POST to /api/decrement-stock, which will UPDATE the Supabase
 * products table. The public-facing hook stays unchanged.
 */

const KEY = "babymo:stock-overrides:v1";
const EVENT = "babymo:stock-updated";

type Overrides = Record<string, number>;

function read(): Overrides {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Overrides) : {};
  } catch {
    return {};
  }
}

function write(o: Overrides): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(o));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export const STOCK_EVENT = EVENT;

/** Effective stock = base − overrides (never negative). */
export function getEffectiveStock(productId: string, baseStock: number): number {
  const o = read();
  return Math.max(0, baseStock - (o[productId] ?? 0));
}

/** Decrement effective stock by `qty` for each item in the list. */
export function decrementStockFor(items: CartItem[]): void {
  if (items.length === 0) return;
  const o = read();
  for (const item of items) {
    o[item.productId] = (o[item.productId] ?? 0) + item.quantity;
  }
  write(o);
}

/** Wipe all overrides (admin "reset stock" — not exposed in UI yet). */
export function resetStockOverrides(): void {
  write({});
}
