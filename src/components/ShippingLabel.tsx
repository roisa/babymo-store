import type { Order } from "@/types";
import { formatDateID } from "@/lib/utils";

export default function ShippingLabel({ order }: { order: Order }) {
  return (
    <div className="mx-auto w-[100mm] bg-white p-4 font-sans text-[11px] text-ink-900 ring-1 ring-ink-900/15 print:m-0 print:ring-0">
      <div className="flex items-center justify-between border-b border-dashed border-ink-900/30 pb-2">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-ink-400">
            Baby Mo
          </p>
          <p className="font-display text-lg leading-none">🌷 babymo.id</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-ink-400">Order</p>
          <p className="font-mono text-xs">{order.order_id}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-[10px] uppercase tracking-widest text-ink-400">
          Kepada
        </p>
        <p className="text-sm font-semibold">{order.customer_name}</p>
        <p>WA: {order.whatsapp}</p>
        <p className="mt-1">{order.address}</p>
        <p>
          {order.city} {order.postal_code}
        </p>
      </div>

      {order.delivery_notes && (
        <div className="mt-3 rounded-md bg-cream-100 px-2 py-1 text-[10px] italic">
          Notes: {order.delivery_notes}
        </div>
      )}

      <div className="mt-3 border-t border-dashed border-ink-900/30 pt-2">
        <p className="text-[10px] uppercase tracking-widest text-ink-400">
          Items
        </p>
        <ul className="mt-1 space-y-0.5">
          {order.items.map((i) => (
            <li key={i.productId} className="flex justify-between gap-2">
              <span className="line-clamp-1">
                {i.quantity}× {i.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex items-end justify-between border-t border-dashed border-ink-900/30 pt-2">
        <p className="text-[9px] text-ink-400">
          Created {formatDateID(order.created_at)}
        </p>
        <div className="flex h-14 w-14 items-center justify-center rounded-md bg-ink-900/5 text-[8px] text-ink-400">
          QR
        </div>
      </div>

      <p className="mt-3 text-center text-[9px] italic text-ink-400">
        thank you for choosing soft 🌷
      </p>
    </div>
  );
}
