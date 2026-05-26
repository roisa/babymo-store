import type { Order } from "@/types";
import { formatDateID, formatIDR } from "./utils";

function escape(value: unknown): string {
  const s = value == null ? "" : String(value);
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function ordersToCSV(orders: Order[]): string {
  const headers = [
    "order_id",
    "created_at",
    "customer_name",
    "whatsapp",
    "address",
    "city",
    "postal_code",
    "delivery_notes",
    "items",
    "subtotal",
    "unique_code",
    "total_payment",
    "payment_status",
    "order_status",
    "verified_at",
  ];

  const rows = orders.map((o) => [
    o.order_id,
    o.created_at ? formatDateID(o.created_at) : "",
    o.customer_name,
    `'${o.whatsapp}`, // leading apostrophe keeps spreadsheet from treating as number
    o.address,
    o.city,
    o.postal_code,
    o.delivery_notes ?? "",
    o.items.map((i) => `${i.quantity}× ${i.name}`).join(" | "),
    formatIDR(o.subtotal),
    o.unique_code,
    formatIDR(o.total_payment),
    o.payment_status,
    o.order_status,
    o.verified_at ? formatDateID(o.verified_at) : "",
  ]);

  return [headers, ...rows].map((r) => r.map(escape).join(",")).join("\n");
}

export function downloadCSV(filename: string, csv: string): void {
  // BOM so Excel opens UTF-8 correctly
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
