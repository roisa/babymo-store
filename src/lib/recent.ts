/**
 * Tracks the last N product IDs the user has viewed.
 * Used to power the "Recently viewed" section on the PDP.
 */

const KEY = "babymo:recent:v1";
const MAX = 8;
export const RECENT_EVENT = "babymo:recent-updated";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function write(arr: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(arr));
  window.dispatchEvent(new CustomEvent(RECENT_EVENT));
}

export function readRecent(): string[] {
  return read();
}

export function trackRecent(productId: string): void {
  const arr = read().filter((id) => id !== productId);
  arr.unshift(productId);
  write(arr.slice(0, MAX));
}
