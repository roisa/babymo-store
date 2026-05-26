"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getLocalOrder } from "@/lib/orders";
import { useLang } from "@/context/LanguageContext";
import { formatIDR } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import OrderTimeline from "@/components/OrderTimeline";
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
    <div className="container-soft max-w-xl py-16 sm:py-20 text-center">
      <div className="relative mx-auto h-28 w-28">
        <div className="absolute inset-0 animate-pulse rounded-full bg-grass-200/40 blur-xl" />
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-grass-fade text-4xl shadow-ios-grass">
          🌱
        </div>
      </div>

      <span className="chip mt-8 inline-flex uppercase tracking-[0.12em]">
        {t.success_eyebrow}
      </span>
      <h1 className="mt-4 font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.025em] text-ink-900 sm:text-[2.5rem]">
        {t.success_title}
      </h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">
        {t.success_subtitle}
      </p>

      {order && (
        <div className="mt-10 rounded-ios-2xl bg-white p-6 text-left shadow-ios ring-1 ring-ink-900/6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-400">
              {t.success_order_label}
            </p>
            <span className="chip uppercase tracking-[0.12em]">
              {order.order_status.replace("_", " ")}
            </span>
          </div>
          <p className="mt-1 font-mono text-[13px] font-semibold tabular-nums text-ink-900">
            {order.order_id}
          </p>

          <div className="mt-5">
            <OrderTimeline status={order.order_status} />
          </div>

          <hr className="my-4 border-ink-900/8" />

          <ul className="space-y-2 text-[13.5px]">
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
              {t.success_total_label}
            </span>
            <span className="font-display text-[22px] font-bold tracking-tight tabular-nums text-ink-900">
              {formatIDR(order.total_payment)}
            </span>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
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
            className="btn-primary"
          >
            {t.success_msg}
          </a>
        )}
      </div>
    </div>
  );
}
