import type { CartItem, Product } from "@/types";

const CART_KEY = "babymo:cart:v1";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as CartItem[];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("babymo:cart-updated"));
}

export function addToCart(product: Product, quantity = 1): CartItem[] {
  const items = readCart();
  const existing = items.find((i) => i.productId === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    });
  }
  writeCart(items);
  return items;
}

export function updateQuantity(productId: string, quantity: number): CartItem[] {
  const items = readCart();
  const next = items
    .map((i) => (i.productId === productId ? { ...i, quantity } : i))
    .filter((i) => i.quantity > 0);
  writeCart(next);
  return next;
}

export function removeFromCart(productId: string): CartItem[] {
  const items = readCart().filter((i) => i.productId !== productId);
  writeCart(items);
  return items;
}

export function clearCart(): void {
  writeCart([]);
}

export function getSubtotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function getItemCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
