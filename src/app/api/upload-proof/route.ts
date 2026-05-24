import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
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
