"use client";

import { formatIDR } from "@/lib/utils";

type Props = {
  price: number;
  qty: number;
  onChangeQty: (q: number) => void;
  onAdd: () => void;
};

export default function StickyCheckoutBar({
  price,
  qty,
  onChangeQty,
  onAdd,
}: Props) {
  return (
    <div className="fixed inset-x-0 bottom-[64px] z-30 border-t border-ink-900/5 bg-warmwhite/95 px-4 py-3 backdrop-blur-xl sm:hidden">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-full bg-cream-100 p-1">
          <button
            onClick={() => onChangeQty(Math.max(1, qty - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm shadow-sm active:scale-95"
            aria-label="Decrease"
          >
            −
          </button>
          <span className="min-w-6 text-center text-sm">{qty}</span>
          <button
            onClick={() => onChangeQty(qty + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm shadow-sm active:scale-95"
            aria-label="Increase"
          >
            +
          </button>
        </div>
        <button
          onClick={onAdd}
          className="btn-primary flex-1 text-sm"
        >
          Add to bag · {formatIDR(price * qty)}
        </button>
      </div>
    </div>
  );
}
