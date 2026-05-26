import type { CartItem, CustomerInfo, Order } from "@/types";
import { formatIDR } from "@/lib/utils";

/**
 * Baby Mo WhatsApp service layer.
 *
 * Phase 1 (now): build wa.me links with prefilled order messages.
 * Phase 2 (later): swap `sendViaFonnte` in `sendMessage` for transactional WA.
 *
 * Upgrade path: replace `sendViaFonnte` with WhatsApp Cloud API or an
 * AI-driven chatbot — keep the public functions unchanged.
 */

const WA_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
  process.env.WHATSAPP_NUMBER ||
  "6282315971002";

const FONNTE_KEY = process.env.FONNTE_API_KEY;
const FONNTE_URL = process.env.FONNTE_API_URL || "https://api.fonnte.com/send";

export function getStoreWhatsApp(): string {
  return WA_NUMBER;
}

export function buildCheckoutMessage(
  items: CartItem[],
  customer: CustomerInfo,
  totalPayment: number,
  orderId: string,
): string {
  const lines = items.map(
    (i) => `• ${i.quantity}x ${i.name} = ${formatIDR(i.price * i.quantity)}`,
  );

  return [
    "Halo Baby Mo 🌷",
    "",
    `Saya ingin order (ID: ${orderId}):`,
    "",
    ...lines,
    "",
    "TOTAL PEMBAYARAN:",
    formatIDR(totalPayment),
    "",
    "DATA PENERIMA:",
    `Nama: ${customer.customer_name}`,
    `Nomor WA: ${customer.whatsapp}`,
    `Alamat Lengkap: ${customer.address}`,
    `Kota: ${customer.city}`,
    `Kode Pos: ${customer.postal_code}`,
    `Catatan Pengiriman: ${customer.delivery_notes || "-"}`,
    "",
    "Terima kasih 💖",
  ].join("\n");
}

export function buildWhatsAppLink(message: string, toNumber?: string): string {
  const number = (toNumber || WA_NUMBER).replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildSimpleConsultLink(productName: string): string {
  return buildWhatsAppLink(
    `Halo Baby Mo 🌷 saya ingin tanya tentang produk: ${productName}`,
  );
}

// ---------- Phase 2 — outbound transactional messages ----------

type SendResult = { ok: boolean; error?: string };

async function sendViaFonnte(to: string, message: string): Promise<SendResult> {
  if (!FONNTE_KEY) {
    return { ok: false, error: "FONNTE_API_KEY not configured" };
  }
  try {
    const res = await fetch(FONNTE_URL, {
      method: "POST",
      headers: {
        Authorization: FONNTE_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        target: to.replace(/\D/g, ""),
        message,
        countryCode: "62",
      }),
    });
    if (!res.ok) {
      return { ok: false, error: `Fonnte HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/** Single transport — swap implementation here to switch providers. */
export async function sendMessage(
  to: string,
  message: string,
): Promise<SendResult> {
  return sendViaFonnte(to, message);
}

export async function sendPaymentConfirmed(order: Order): Promise<SendResult> {
  const msg = [
    `Halo ${order.customer_name} 🌷`,
    "",
    `Pembayaran untuk order ${order.order_id} sudah kami terima ✨`,
    "",
    "Pesananmu sedang kami siapkan dengan penuh cinta.",
    "Kami akan kabari lagi saat paketmu dikirim ya 💖",
    "",
    "— Baby Mo",
  ].join("\n");
  return sendMessage(order.whatsapp, msg);
}

export async function sendOrderShipped(
  order: Order,
  trackingNumber?: string,
): Promise<SendResult> {
  const msg = [
    `Halo ${order.customer_name} 🌷`,
    "",
    `Order ${order.order_id} sudah dalam perjalanan menuju rumahmu 📦`,
    trackingNumber ? `\nNo. resi: ${trackingNumber}` : "",
    "",
    "Semoga harimu hangat dan nyaman hari ini 💖",
    "— Baby Mo",
  ]
    .filter(Boolean)
    .join("\n");
  return sendMessage(order.whatsapp, msg);
}

export async function sendThankYouMessage(order: Order): Promise<SendResult> {
  const msg = [
    `Halo ${order.customer_name} 🌷`,
    "",
    "Terima kasih sudah memilih Baby Mo ✨",
    "Kalau kamu sempat, kami akan senang sekali kalau kamu",
    "bagi sedikit pengalamanmu dengan produk kami 💌",
    "",
    "— Tim Baby Mo",
  ].join("\n");
  return sendMessage(order.whatsapp, msg);
}
