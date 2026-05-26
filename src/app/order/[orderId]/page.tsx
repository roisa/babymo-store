"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getLocalOrder } from "@/lib/orders";
import { useLang } from "@/context/LanguageContext";
import { formatDateID, formatIDR } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import OrderTimeline from "@/components/OrderTimeline";
import type { Order } from "@/types";

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const { lang } = useLang();
  const [order, setOrder] = useState<Order | undefined>();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setOrder(getLocalOrder(orderId));
  }, [orderId]);

  if (hydrated && !order) {
    return (
      <div className="container-soft max-w-xl py-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream-100 text-3xl ring-1 ring-ink-900/[0.06]">
          🔍
        </div>
        <h1 className="mt-6 font-display text-[1.75rem] font-bold tracking-[-0.02em] text-ink-900">
          {lang === "id"
            ? "Pesanan tidak ditemukan di perangkat ini."
            : "We can't find that order on this device."}
        </h1>
        <p className="mt-3 text-[14px] text-ink-400">
          {lang === "id"
            ? "Catatan pesanan tersimpan di browser tempat kamu checkout. Coba buka di perangkat itu, atau hubungi kami via WhatsApp dengan ID pesananmu."
            : "Order records are saved on the browser you checked out from. Try opening this page there, or message us on WhatsApp with your order ID."}
        </p>
        <a
          href={buildWhatsAppLink(
            `Halo Baby Mo 🌱 saya ingin cek status order ${orderId}`,
          )}
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-6 inline-flex"
        >
          {lang === "id" ? "Chat Baby Mo" : "Message Baby Mo"}
        </a>
        <div className="mt-6">
          <Link
            href="/order"
            className="text-[12px] font-semibold text-grass-700 hover:text-grass-800"
          >
            {lang === "id"
              ? "← Cek dengan ID lain"
              : "← Look up another order"}
          </Link>
        </div>
      </div>
    );
  }
  if (!order) return null;

  return (
    <div className="container-soft max-w-2xl py-12 sm:py-14">
      <Link
        href="/order"
        className="text-[12px] font-medium text-ink-400 hover:text-ink-700"
      >
        ← {lang === "id" ? "Pesanan lain" : "Another order"}
      </Link>

      <div className="mt-3 flex flex-col items-start gap-1">
        <span className="chip uppercase tracking-[0.12em]">
          {lang === "id" ? "status pesanan" : "order status"}
        </span>
        <h1 className="mt-3 font-display text-[2rem] font-bold tracking-[-0.025em] text-ink-900 sm:text-[2.5rem]">
          {lang === "id" ? "Pesananmu sedang…" : "Your order is…"}
        </h1>
        <p className="mt-1 font-mono text-[12px] tabular-nums text-ink-400">
          {order.order_id} · {formatDateID(order.created_at)}
        </p>
      </div>

      {/* Timeline */}
      <div className="mt-8 rounded-ios-2xl bg-white p-6 shadow-ios ring-1 ring-ink-900/[0.06]">
        <OrderTimeline status={order.order_status} />
      </div>

      {/* Items + totals */}
      <div className="mt-4 rounded-ios-2xl bg-white p-6 shadow-ios ring-1 ring-ink-900/[0.06]">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400">
          {lang === "id" ? "Isi pesanan" : "Items"}
        </h2>
        <ul className="mt-3 space-y-2 text-[13.5px]">
          {order.items.map((i) => (
            <li
              key={i.productId}
              className="flex items-center justify-between gap-2 text-ink-700"
            >
              <span className="line-clamp-1">
                {i.quantity}× {i.name}
              </span>
              <span className="font-medium tabular-nums">
                {formatIDR(i.price * i.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <hr className="my-4 border-ink-900/8" />
        <div className="flex items-end justify-between">
          <span className="text-[13px] font-medium text-ink-600">
            {lang === "id" ? "Total" : "Total"}
          </span>
          <span className="font-display text-[22px] font-bold tracking-tight tabular-nums text-grass-700">
            {formatIDR(order.total_payment)}
          </span>
        </div>
      </div>

      {/* Proof preview, if uploaded */}
      {order.proof_image && (
        <div className="mt-4 rounded-ios-2xl bg-white p-6 shadow-ios ring-1 ring-ink-900/[0.06]">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400">
            {lang === "id"
              ? "Bukti pembayaran yang kamu kirim"
              : "Payment proof you uploaded"}
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={order.proof_image}
            alt="payment proof"
            className="mt-3 max-h-56 w-full rounded-ios object-contain"
          />
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
        {order.order_status === "pending_payment" && (
          <Link
            href={`/payment/${order.order_id}`}
            className="btn-orange"
          >
            {lang === "id" ? "Bayar sekarang" : "Pay now"}
          </Link>
        )}
        <a
          href={buildWhatsAppLink(
            `Halo Baby Mo 🌱 saya ingin tanya tentang order ${order.order_id}`,
          )}
          target="_blank"
          rel="noreferrer"
          className="btn-soft"
        >
          {lang === "id" ? "Chat Baby Mo" : "Message Baby Mo"}
        </a>
        <Link href="/products" className="btn-ghost">
          {lang === "id" ? "Lanjut belanja" : "Keep browsing"}
        </Link>
      </div>
    </div>
  );
}
