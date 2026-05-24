import { NextResponse } from "next/server";
import {
  sendMessage,
  sendOrderShipped,
  sendPaymentConfirmed,
  sendThankYouMessage,
} from "@/lib/whatsapp";
import type { Order } from "@/types";

/**
 * Transactional WhatsApp endpoint.
 *
 * Body shapes:
 *   { type: "raw",            to: string, message: string }
 *   { type: "payment_confirmed", order: Order }
 *   { type: "order_shipped",     order: Order, tracking?: string }
 *   { type: "thank_you",         order: Order }
 *
 * Webhook-ready: this route can be triggered from the admin dashboard
 * or, later, from a Supabase trigger / cron job.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.type) {
    return NextResponse.json({ error: "Missing type" }, { status: 400 });
  }

  try {
    let result;
    switch (body.type) {
      case "raw":
        if (!body.to || !body.message)
          return NextResponse.json({ error: "Missing to/message" }, { status: 400 });
        result = await sendMessage(body.to, body.message);
        break;
      case "payment_confirmed":
        result = await sendPaymentConfirmed(body.order as Order);
        break;
      case "order_shipped":
        result = await sendOrderShipped(body.order as Order, body.tracking);
        break;
      case "thank_you":
        result = await sendThankYouMessage(body.order as Order);
        break;
      default:
        return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
