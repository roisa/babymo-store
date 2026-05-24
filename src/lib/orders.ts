import type { Order } from "@/types";

const ORDERS_KEY = "babymo:orders:v1";

/**
 * Lightweight client-side order store.
 * Used as a fallback when Supabase isn't configured, and to keep an
 * "order history" handy for the customer on this device.
 */

export function readLocalOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

export function writeLocalOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function saveLocalOrder(order: Order): void {
  const all = readLocalOrders();
  const idx = all.findIndex((o) => o.order_id === order.order_id);
  if (idx >= 0) all[idx] = order;
  else all.unshift(order);
  writeLocalOrders(all.slice(0, 50));
}

export function getLocalOrder(orderId: string): Order | undefined {
  return readLocalOrders().find((o) => o.order_id === orderId);
}

export function updateLocalOrder(
  orderId: string,
  patch: Partial<Order>,
): Order | undefined {
  const all = readLocalOrders();
  const idx = all.findIndex((o) => o.order_id === orderId);
  if (idx < 0) return undefined;
  all[idx] = { ...all[idx], ...patch };
  writeLocalOrders(all);
  return all[idx];
}
