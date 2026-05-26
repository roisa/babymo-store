import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // 10 proof uploads per IP per minute (a customer may retry a few times).
  const limited = rateLimit(`proof:${clientIp(req)}`, {
    max: 10,
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

  const { order_id, proof_image } = await req.json();

  if (!order_id || !proof_image) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const db = supabaseAdmin();
  if (!db) {
    return NextResponse.json({ ok: true, persisted: false });
  }

  // Update orders table
  await db
    .from("orders")
    .update({
      payment_status: "uploaded",
      order_status: "waiting_verification",
    })
    .eq("order_id", order_id);

  // Insert payment record
  const { error } = await db.from("payments").upsert(
    {
      order_id,
      proof_image,
      payment_status: "uploaded",
    },
    { onConflict: "order_id" },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
