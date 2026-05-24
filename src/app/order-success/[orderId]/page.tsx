"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getLocalOrder } from "@/lib/orders";
import { formatIDR } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Order } from "@/types";

export default function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | undefined>();

  useEffect(() => {
    setOrder(getLocalOrder(orderId));
  }, [orderId]);

  return (
    <div className="container-soft max-w-xl py-16 text-center">
      <div className="relative mx-auto h-24 w-24">
        <div className="absolute inset-0 animate-pulse rounded-full bg-pinky-200/60" />
        <div className="absolute inset-2 rounded-full bg-pinky-100" />
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          🌷
        </div>
      </div>

      <p className="mt-6 text-xs font-medium uppercase tracking-widest text-pinky-500">
        thank you
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink-900 sm:text-4xl">
        Your order is on its way to being verified.
      </h1>
      <p className="mt-2 text-sm text-ink-600">
        We'll confirm via WhatsApp shortly. Take a deep breath — you've done the soft thing today.
      </p>

      {order && (
        <div className="mt-8 rounded-3xl bg-white p-5 text-left shadow-card ring-1 ring-ink-900/5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-ink-400">Order</p>
            <span className="rounded-full bg-pinky-100 px-3 py-1 text-[11px] text-pinky-500">
              {order.order_status.replace("_", " ")}
            </span>
          </div>
          <p className="mt-1 font-mono text-sm text-ink-900">{order.order_id}</p>

          <ul className="mt-4 space-y-2 text-sm">
            {order.items.map((i) => (
              <li
                key={i.productId}
                className="flex items-center justify-between gap-2 text-ink-700"
              >
                <span className="line-clamp-1">
                  {i.quantity}× {i.name}
                </span>
                <span>{formatIDR(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4 border-ink-900/5" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-600">Total paid</span>
            <span className="font-display text-2xl text-ink-900">
              {formatIDR(order.total_payment)}
            </span>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/products" className="btn-soft">
          Keep browsing
        </Link>
        {order && (
          <a
            href={buildWhatsAppLink(
              `Halo Baby Mo, saya baru upload pembayaran untuk order ${order.order_id} 🌷`,
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-pink"
          >
            Message Baby Mo
          </a>
        )}
      </div>
    </div>
  );
}
