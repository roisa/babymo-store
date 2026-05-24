"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import ShippingLabel from "@/components/ShippingLabel";
import { getLocalOrder } from "@/lib/orders";
import { useLang } from "@/context/LanguageContext";
import type { Order } from "@/types";

export default function ShippingLabelPage({
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

  if (!order) {
    return (
      <div className="container-soft py-20 text-center">
        <p className="text-sm text-ink-400">{t.label_loading(orderId)}</p>
      </div>
    );
  }

  return (
    <div className="bg-warmwhite py-8 print:py-0">
      <div className="no-print container-soft mb-6 flex items-center justify-between">
        <Link
          href="/admin"
          className="text-xs font-semibold text-ink-400 hover:text-grass-600"
        >
          {t.label_back}
        </Link>
        <button onClick={() => window.print()} className="btn-primary text-xs">
          {t.label_print}
        </button>
      </div>
      <ShippingLabel order={order} />
    </div>
  );
}
