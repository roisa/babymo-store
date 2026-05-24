"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import ShippingLabel from "@/components/ShippingLabel";
import { getLocalOrder } from "@/lib/orders";
import type { Order } from "@/types";

export default function ShippingLabelPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | undefined>();

  useEffect(() => {
    setOrder(getLocalOrder(orderId));
  }, [orderId]);

  if (!order) {
    return (
      <div className="container-soft py-20 text-center">
        <p className="text-sm text-ink-400">
          Loading label for {orderId}…
        </p>
      </div>
    );
  }

  return (
    <div className="bg-warmwhite py-8 print:py-0">
      <div className="no-print container-soft mb-6 flex items-center justify-between">
        <Link href="/admin" className="text-xs text-ink-400 hover:text-ink-900">
          ← Back to admin
        </Link>
        <button
          onClick={() => window.print()}
          className="btn-primary text-xs"
        >
          🖨 Print label
        </button>
      </div>
      <ShippingLabel order={order} />
    </div>
  );
}
