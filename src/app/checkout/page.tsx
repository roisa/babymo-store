"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import {
  formatIDR,
  generateOrderId,
  generateUniqueCode,
} from "@/lib/utils";
import { buildCheckoutMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { saveLocalOrder } from "@/lib/orders";
import type { CustomerInfo, Order } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const { notify } = useToast();

  const [form, setForm] = useState<CustomerInfo>({
    customer_name: "",
    whatsapp: "",
    address: "",
    city: "",
    postal_code: "",
    delivery_notes: "",
  });
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const saved = localStorage.getItem("babymo:customer");
      if (saved) setForm((f) => ({ ...f, ...JSON.parse(saved) }));
      const notes = localStorage.getItem("babymo:delivery-notes");
      if (notes) setForm((f) => ({ ...f, delivery_notes: notes }));
    } catch {}
  }, []);

  const uniqueCode = useMemo(() => generateUniqueCode(), []);
  const total = subtotal + uniqueCode;

  const setField = (k: keyof CustomerInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [k]: e.target.value });

  const validate = (): string | null => {
    if (!form.customer_name.trim()) return "Nama tidak boleh kosong";
    if (!/^\d{9,15}$/.test(form.whatsapp.replace(/\D/g, "")))
      return "Nomor WhatsApp tidak valid";
    if (!form.address.trim()) return "Alamat tidak boleh kosong";
    if (!form.city.trim()) return "Kota tidak boleh kosong";
    if (!/^\d{4,6}$/.test(form.postal_code.trim()))
      return "Kode pos tidak valid";
    return null;
  };

  const handleCheckout = async () => {
    const err = validate();
    if (err) {
      notify(err, "error");
      return;
    }
    setSubmitting(true);

    const orderId = generateOrderId();
    const order: Order = {
      order_id: orderId,
      customer_name: form.customer_name.trim(),
      whatsapp: form.whatsapp.replace(/\D/g, ""),
      address: form.address.trim(),
      city: form.city.trim(),
      postal_code: form.postal_code.trim(),
      delivery_notes: form.delivery_notes?.trim() || "",
      items,
      subtotal,
      unique_code: uniqueCode,
      total_payment: total,
      payment_status: "pending",
      order_status: "pending_payment",
      created_at: new Date().toISOString(),
    };

    // Persist locally
    saveLocalOrder(order);
    try {
      localStorage.setItem("babymo:customer", JSON.stringify(form));
    } catch {}

    // Best-effort: persist to API (Supabase). Don't block checkout if it fails.
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch {}

    // Open WhatsApp with prefilled message
    const msg = buildCheckoutMessage(items, form, total, orderId);
    const link = buildWhatsAppLink(msg);
    window.open(link, "_blank", "noopener,noreferrer");

    // Clear cart, head to payment
    clear();
    router.push(`/payment/${orderId}`);
  };

  if (hydrated && items.length === 0) {
    return (
      <div className="container-soft py-24 text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-pinky-100" />
        <h1 className="mt-6 font-display text-2xl text-ink-900">
          Your bag is empty.
        </h1>
        <p className="mt-1 text-sm text-ink-400">
          Add something gentle first, then come back here.
        </p>
        <Link href="/products" className="btn-pink mt-6 inline-flex">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-soft py-8 sm:py-12">
      <p className="text-xs font-medium uppercase tracking-widest text-pinky-500">
        checkout
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink-900 sm:text-4xl">
        Just a few soft details.
      </h1>
      <p className="mt-1 max-w-md text-sm text-ink-600">
        We'll confirm your order through WhatsApp right after this.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <div className="card p-5 sm:p-7">
          <h2 className="font-display text-xl text-ink-900">Delivery details</h2>
          <div className="mt-5 grid gap-4">
            <Field label="Full name">
              <input className="input" value={form.customer_name} onChange={setField("customer_name")} placeholder="Maria Putri" />
            </Field>
            <Field label="WhatsApp number">
              <input className="input" type="tel" inputMode="numeric" value={form.whatsapp} onChange={setField("whatsapp")} placeholder="08123456789" />
            </Field>
            <Field label="Full address">
              <textarea className="input min-h-[88px]" value={form.address} onChange={setField("address")} placeholder="Jl. Melati No. 12, RT 03/RW 05, Kel. Mawar" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="City">
                <input className="input" value={form.city} onChange={setField("city")} placeholder="Bandung" />
              </Field>
              <Field label="Postal code">
                <input className="input" inputMode="numeric" value={form.postal_code} onChange={setField("postal_code")} placeholder="40115" />
              </Field>
            </div>
            <Field label="Delivery notes (optional)">
              <textarea className="input min-h-[64px]" value={form.delivery_notes ?? ""} onChange={setField("delivery_notes")} placeholder="tolong bungkus rapi, ini hadiah 🌷" />
            </Field>
          </div>
        </div>

        {/* Summary */}
        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="font-display text-xl text-ink-900">Order summary</h2>
            <ul className="mt-4 space-y-3">
              {items.map((i) => (
                <li key={i.productId} className="flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="line-clamp-1 text-ink-900">{i.name}</p>
                    <p className="text-xs text-ink-400">× {i.quantity}</p>
                  </div>
                  <span className="text-ink-900">{formatIDR(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <hr className="my-4 border-ink-900/5" />
            <div className="space-y-1.5 text-sm">
              <Row label="Subtotal" value={formatIDR(subtotal)} />
              <Row
                label={
                  <span className="flex items-center gap-1">
                    Unique code
                    <span className="rounded-full bg-pinky-100 px-1.5 py-0.5 text-[10px] text-pinky-500">
                      auto
                    </span>
                  </span>
                }
                value={`+ ${formatIDR(uniqueCode)}`}
              />
              <Row label="Shipping" value="confirmed via WhatsApp" subtle />
            </div>
            <hr className="my-4 border-ink-900/5" />
            <div className="flex items-end justify-between">
              <span className="text-sm text-ink-600">Total</span>
              <span className="font-display text-3xl text-ink-900">{formatIDR(total)}</span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-400">
              The unique code helps us match your payment instantly. Please transfer the exact amount.
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={submitting}
            className="btn-primary w-full"
          >
            {submitting ? "Opening WhatsApp…" : "Checkout via WhatsApp"}
            <Wa />
          </button>
          <p className="text-center text-[11px] text-ink-400">
            By continuing, you agree to be contacted via WhatsApp about your order.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}

function Row({
  label,
  value,
  subtle,
}: {
  label: React.ReactNode;
  value: string;
  subtle?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={subtle ? "text-ink-400" : "text-ink-600"}>{label}</span>
      <span className={subtle ? "text-ink-400" : "text-ink-900"}>{value}</span>
    </div>
  );
}

function Wa() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5 3.5A11 11 0 0 0 3.7 17.2L2 22l5-1.6A11 11 0 1 0 20.5 3.5Zm-8.5 18a9 9 0 0 1-4.6-1.3l-.3-.2-3 .9.9-2.9-.2-.3a9 9 0 1 1 7.2 3.8Zm5.1-6.6c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5l-.7-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.1 3 .1.2 2 3.1 4.9 4.4.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}
