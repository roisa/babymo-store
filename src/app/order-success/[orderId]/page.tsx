"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getLocalOrder } from "@/lib/orders";
import { useLang } from "@/context/LanguageContext";
import { formatIDR } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Order } from "@/types";

export default function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const { t } = useLang();
  const [order, setOrder] = useState<Order | undefined>();

  useEffect(() => {
    setOrder(getLocalOrder(orderId));
  }, [orderId]);

  return (
    <div className="container-soft max-w-xl py-16 text-center">
      <div className="relative mx-auto h-24 w-24">
        <div className="absolute inset-0 animate-pulse rounded-full bg-grass-200/60" />
        <div className="absolute inset-2 rounded-full bg-grass-100" />
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          🌱
        </div>
      </div>

      <span className="chip mt-6 inline-flex uppercase tracking-wider">
        {t.success_eyebrow}
      </span>
      <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
        {t.success_title}
      </h1>
      <p className="mt-2 text-sm text-ink-600">{t.success_subtitle}</p>

      {order && (
        <div className="mt-8 rounded-3xl bg-white p-5 text-left shadow-card ring-2 ring-grass-100">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-ink-400">
              {t.success_order_label}
            </p>
            <span className="rounded-full bg-grass-100 px-3 py-1 text-[11px] font-bold text-grass-700">
              {order.order_status.replace("_", " ")}
            </span>
          </div>
          <p className="mt-1 font-mono text-sm font-bold text-ink-900">
            {order.order_id}
          </p>

          <ul className="mt-4 space-y-2 text-sm">
            {order.items.map((i) => (
              <li
                key={i.productId}
                className="flex items-center justify-between gap-2 text-ink-700"
              >
                <span className="line-clamp-1">
                  {i.quantity}× {i.name}
                </span>
                <span className="font-semibold">
                  {formatIDR(i.price * i.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <hr className="my-4 border-grass-100" />
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-ink-600">
              {t.success_total_label}
            </span>
            <span className="font-display text-2xl font-bold text-grass-600">
              {formatIDR(order.total_payment)}
            </span>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/products" className="btn-soft">
          {t.success_keep_browsing}
        </Link>
        {order && (
          <a
            href={buildWhatsAppLink(
              `Halo Baby Mo, saya baru upload pembayaran untuk order ${order.order_id} 🌱`,
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-orange"
          >
            {t.success_msg}
          </a>
        )}
      </div>
    </div>
  );
}
