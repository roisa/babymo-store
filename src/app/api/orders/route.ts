import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import type { Order } from "@/types";

export async function POST(req: Request) {
  // 5 orders per IP per minute — generous for a real customer placing
  // a couple of test orders, harsh on bots trying to spam.
  const limited = rateLimit(`orders:${clientIp(req)}`, {
    max: 5,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  const order = (await req.json()) as Order;

  if (!order?.order_id) {
    return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
  }

  const db = supabaseAdmin();
  if (!db) {
    // Supabase not configured — accept the order silently; client persists locally.
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await db.from("orders").insert({
    order_id: order.order_id,
    customer_name: order.customer_name,
    whatsapp: order.whatsapp,
    address: order.address,
    city: order.city,
    postal_code: order.postal_code,
    delivery_notes: order.delivery_notes ?? null,
    items: order.items,
    subtotal: order.subtotal,
    unique_code: order.unique_code,
    total_payment: order.total_payment,
    payment_status: order.payment_status,
    order_status: order.order_status,
    created_at: order.created_at,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, persisted: true });
}

export async function GET() {
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ orders: [], persisted: false });

  const { data, error } = await db
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ orders: data ?? [], persisted: true });
}
