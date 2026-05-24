"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, Product } from "@/types";
import {
  addToCart as addToStorage,
  clearCart as clearStorage,
  getItemCount,
  getSubtotal,
  readCart,
  removeFromCart as removeFromStorage,
  updateQuantity as updateQtyStorage,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setHydrated(true);
    const handler = () => setItems(readCart());
    window.addEventListener("babymo:cart-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("babymo:cart-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const add = useCallback((product: Product, quantity = 1) => {
    const next = addToStorage(product, quantity);
    setItems(next);
  }, []);

  const remove = useCallback((productId: string) => {
    const next = removeFromStorage(productId);
    setItems(next);
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    const next = updateQtyStorage(productId, qty);
    setItems(next);
  }, []);

  const clear = useCallback(() => {
    clearStorage();
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items: hydrated ? items : [],
      count: getItemCount(items),
      subtotal: getSubtotal(items),
      isOpen,
      open,
      close,
      toggle,
      add,
      remove,
      setQty,
      clear,
    }),
    [items, hydrated, isOpen, open, close, toggle, add, remove, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
