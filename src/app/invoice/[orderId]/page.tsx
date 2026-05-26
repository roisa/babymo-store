"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Invoice from "@/components/Invoice";
import { getLocalOrder } from "@/lib/orders";
import { useLang } from "@/context/LanguageContext";
import type { Order } from "@/types";

export default function InvoicePage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const { lang } = useLang();
  const [order, setOrder] = useState<Order | undefined>();

  useEffect(() => {
    setOrder(getLocalOrder(orderId));
  }, [orderId]);

  if (!order) {
    return (
      <div className="container-soft py-20 text-center">
        <p className="text-sm text-ink-400">
          {lang === "id"
            ? `Memuat invoice untuk ${orderId}…`
            : `Loading invoice for ${orderId}…`}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-warmwhite py-8 print:bg-white print:py-0">
      {/* Switch print page size to A4 for this route (default is
          100×150 mm for thermal shipping labels). */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@media print { @page { size: A4; margin: 12mm; } body::before { display: none; } }",
        }}
      />
      <div className="no-print container-soft mb-6 flex items-center justify-between">
        <Link
          href="/admin"
          className="text-xs font-semibold text-ink-400 hover:text-grass-600"
        >
          {lang === "id" ? "← Kembali ke admin" : "← Back to admin"}
        </Link>
        <button onClick={() => window.print()} className="btn-primary text-xs">
          🖨 {lang === "id" ? "Cetak invoice" : "Print invoice"}
        </button>
      </div>
      <Invoice order={order} />
    </div>
  );
}
