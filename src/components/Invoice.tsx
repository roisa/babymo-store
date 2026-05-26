"use client";

import type { Order } from "@/types";
import { formatDateID, formatIDR } from "@/lib/utils";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * A4-friendly invoice. Companion to the thermal ShippingLabel.
 * Print CSS in globals.css already handles `@page` for printing.
 */
export default function Invoice({ order }: { order: Order }) {
  const subtotal = order.items.reduce(
    (s, i) => s + i.price * i.quantity,
    0,
  );

  return (
    <div className="mx-auto w-full max-w-[210mm] bg-white p-10 text-[12px] text-ink-900 shadow-ios ring-1 ring-ink-900/[0.06] print:p-8 print:shadow-none print:ring-0">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-ink-900/15 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-grass-fade text-[18px] font-bold text-white shadow-ios-grass">
            M
          </div>
          <div>
            <p className="font-display text-[20px] font-bold tracking-tight">
              {SITE_NAME}
            </p>
            <p className="text-[10px] text-ink-400">{SITE_URL.replace(/^https?:\/\//, "")}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-[26px] font-bold tracking-tight">
            INVOICE
          </p>
          <p className="mt-1 font-mono text-[11px] tabular-nums">
            {order.order_id}
          </p>
          <p className="text-[10px] text-ink-400">
            {formatDateID(order.created_at)}
          </p>
        </div>
      </div>

      {/* Bill to + payment */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink-400">
            Kepada
          </p>
          <p className="mt-1 text-[14px] font-semibold">
            {order.customer_name}
          </p>
          <p className="mt-1">WA: {order.whatsapp}</p>
          <p className="mt-2 leading-relaxed">{order.address}</p>
          <p>
            {order.city} {order.postal_code}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink-400">
            Status
          </p>
          <span
            className={`mt-1 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${
              order.payment_status === "verified"
                ? "bg-grass-100 text-grass-700"
                : order.payment_status === "uploaded"
                  ? "bg-tangerine-100 text-tangerine-600"
                  : "bg-ink-900/[0.06] text-ink-700"
            }`}
          >
            {order.payment_status === "verified"
              ? "Lunas"
              : order.payment_status === "uploaded"
                ? "Menunggu verifikasi"
                : order.payment_status === "rejected"
                  ? "Ditolak"
                  : "Belum bayar"}
          </span>
          {order.verified_at && (
            <p className="mt-2 text-[10px] text-ink-400">
              Verified {formatDateID(order.verified_at)}
            </p>
          )}
          <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.14em] text-ink-400">
            Status order
          </p>
          <p className="mt-1 text-[11px] capitalize">
            {order.order_status.replace(/_/g, " ")}
          </p>
        </div>
      </div>

      {order.delivery_notes && (
        <p className="mt-4 rounded-md bg-tangerine-50 px-3 py-2 text-[11px] italic ring-1 ring-tangerine-100">
          Catatan: {order.delivery_notes}
        </p>
      )}

      {/* Items table */}
      <table className="mt-6 w-full border-collapse text-[12px]">
        <thead>
          <tr className="border-b border-ink-900/15 text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400">
            <th className="pb-2 text-left">Produk</th>
            <th className="pb-2 text-right">Qty</th>
            <th className="pb-2 text-right">Harga</th>
            <th className="pb-2 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((i) => (
            <tr
              key={i.productId}
              className="border-b border-ink-900/[0.06]"
            >
              <td className="py-2">{i.name}</td>
              <td className="py-2 text-right tabular-nums">{i.quantity}</td>
              <td className="py-2 text-right tabular-nums">
                {formatIDR(i.price)}
              </td>
              <td className="py-2 text-right font-medium tabular-nums">
                {formatIDR(i.price * i.quantity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="mt-4 flex justify-end">
        <div className="w-full max-w-[280px] space-y-1.5 text-[12px]">
          <div className="flex justify-between">
            <span className="text-ink-600">Subtotal</span>
            <span className="tabular-nums">{formatIDR(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-600">Kode unik</span>
            <span className="tabular-nums">+ {formatIDR(order.unique_code)}</span>
          </div>
          <div className="flex justify-between text-ink-400">
            <span>Ongkir</span>
            <span className="italic">via WhatsApp</span>
          </div>
          <hr className="my-2 border-ink-900/15" />
          <div className="flex justify-between text-[16px] font-bold">
            <span>Total</span>
            <span className="font-display tabular-nums text-grass-700">
              {formatIDR(order.total_payment)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 border-t border-dashed border-ink-900/20 pt-4 text-center text-[10px] text-ink-400">
        Terima kasih sudah memilih lembut 🌱 — {SITE_NAME}
      </div>
    </div>
  );
}
