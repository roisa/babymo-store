"use client";

import { useLang } from "@/context/LanguageContext";
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
  const { t } = useLang();
  return (
    <div className="fixed inset-x-0 bottom-3 z-30 px-4 pb-[max(0px,env(safe-area-inset-bottom))] sm:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2.5 rounded-full glass-thick p-1.5">
        <div className="flex items-center gap-1 rounded-full bg-ink-900/[0.05] p-0.5">
          <button
            onClick={() => onChangeQty(Math.max(1, qty - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[13px] font-semibold shadow-ios transition active:scale-95"
            aria-label="−"
          >
            −
          </button>
          <span className="min-w-6 text-center text-[12.5px] font-semibold tabular-nums">
            {qty}
          </span>
          <button
            onClick={() => onChangeQty(qty + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[13px] font-semibold shadow-ios transition active:scale-95"
            aria-label="+"
          >
            +
          </button>
        </div>
        <button onClick={onAdd} className="btn-primary flex-1 text-[13.5px] py-3">
          {t.pdp_add_to_bag} · {formatIDR(price * qty)}
        </button>
      </div>
    </div>
  );
}
