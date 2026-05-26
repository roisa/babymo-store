"use client";

import { useEffect, useState } from "react";
import { STOCK_EVENT, getEffectiveStock } from "@/lib/stock";

/**
 * Live effective stock for a product.
 * Returns the base stock on first render (so SSR/CSR match), then
 * updates from localStorage on mount and on stock-update events.
 */
export function useStock(productId: string, baseStock: number): number {
  const [stock, setStock] = useState(baseStock);

  useEffect(() => {
    setStock(getEffectiveStock(productId, baseStock));
    const sync = () => setStock(getEffectiveStock(productId, baseStock));
    window.addEventListener(STOCK_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(STOCK_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [productId, baseStock]);

  return stock;
}
