"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useLang } from "@/context/LanguageContext";
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
  const { t } = useLang();

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

  const setField =
    (k: keyof CustomerInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const validate = (): string | null => {
    if (!form.customer_name.trim()) return t.checkout_err_name;
    if (!/^\d{9,15}$/.test(form.whatsapp.replace(/\D/g, "")))
      return t.checkout_err_whatsapp;
    if (!form.address.trim()) return t.checkout_err_address;
    if (!form.city.trim()) return t.checkout_err_city;
    if (!/^\d{4,6}$/.test(form.postal_code.trim()))
      return t.checkout_err_postal;
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

    saveLocalOrder(order);
    try {
      localStorage.setItem("babymo:customer", JSON.stringify(form));
    } catch {}

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch {}

    const msg = buildCheckoutMessage(items, form, total, orderId);
    const link = buildWhatsAppLink(msg);
    window.open(link, "_blank", "noopener,noreferrer");

    clear();
    router.push(`/payment/${orderId}`);
  };

  if (hydrated && items.length === 0) {
    return (
      <div className="container-soft py-24 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-grass-50 text-4xl ring-1 ring-grass-100">
          🌱
        </div>
        <h1 className="mt-6 font-display text-[1.75rem] font-bold tracking-[-0.02em] text-ink-900">
          {t.checkout_empty_title}
        </h1>
        <p className="mt-2 text-[14px] text-ink-400">{t.checkout_empty_sub}</p>
        <Link href="/products" className="btn-primary mt-6 inline-flex">
          {t.checkout_empty_cta}
        </Link>
      </div>
    );
  }

  return (
    <div className="container-soft py-10 sm:py-14">
      <span className="chip uppercase tracking-[0.12em]">
        {t.checkout_eyebrow}
      </span>
      <h1 className="mt-4 font-display text-[2.25rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-[2.75rem]">
        {t.checkout_title}
      </h1>
      <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-ink-600">
        {t.checkout_subtitle}
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="card p-6 sm:p-7">
          <h2 className="font-display text-[20px] font-bold tracking-[-0.02em] text-ink-900">
            {t.checkout_form_title}
          </h2>
          <div className="mt-5 grid gap-4">
            <Field label={t.field_name}>
              <input
                className="input"
                value={form.customer_name}
                onChange={setField("customer_name")}
                placeholder={t.field_name_ph}
              />
            </Field>
            <Field label={t.field_whatsapp}>
              <input
                className="input"
                type="tel"
                inputMode="numeric"
                value={form.whatsapp}
                onChange={setField("whatsapp")}
                placeholder={t.field_whatsapp_ph}
              />
            </Field>
            <Field label={t.field_address}>
              <textarea
                className="input min-h-[88px]"
                value={form.address}
                onChange={setField("address")}
                placeholder={t.field_address_ph}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t.field_city}>
                <input
                  className="input"
                  value={form.city}
                  onChange={setField("city")}
                  placeholder={t.field_city_ph}
                />
              </Field>
              <Field label={t.field_postal}>
                <input
                  className="input"
                  inputMode="numeric"
                  value={form.postal_code}
                  onChange={setField("postal_code")}
                  placeholder={t.field_postal_ph}
                />
              </Field>
            </div>
            <Field label={t.field_notes}>
              <textarea
                className="input min-h-[64px]"
                value={form.delivery_notes ?? ""}
                onChange={setField("delivery_notes")}
                placeholder={t.field_notes_ph}
              />
            </Field>
          </div>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-[80px] lg:self-start">
          <div className="card p-6">
            <h2 className="font-display text-[18px] font-bold tracking-[-0.02em] text-ink-900">
              {t.summary_title}
            </h2>
            <ul className="mt-4 space-y-3">
              {items.map((i) => (
                <li
                  key={i.productId}
                  className="flex items-center justify-between gap-3 text-[13.5px]"
                >
                  <div className="min-w-0">
                    <p className="line-clamp-1 font-medium text-ink-900">
                      {i.name}
                    </p>
                    <p className="text-[11.5px] text-ink-400">× {i.quantity}</p>
                  </div>
                  <span className="font-medium tabular-nums text-ink-900">
                    {formatIDR(i.price * i.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <hr className="my-4 border-ink-900/8" />
            <div className="space-y-2 text-[13.5px]">
              <Row label={t.summary_subtotal} value={formatIDR(subtotal)} />
              <Row
                label={
                  <span className="flex items-center gap-1.5">
                    {t.summary_unique}
                    <span className="rounded-full bg-tangerine-50 px-1.5 py-0.5 text-[10px] font-semibold text-tangerine-600 ring-1 ring-tangerine-100">
                      {t.summary_unique_chip}
                    </span>
                  </span>
                }
                value={`+ ${formatIDR(uniqueCode)}`}
              />
              <Row
                label={t.summary_shipping}
                value={t.summary_shipping_value}
                subtle
              />
            </div>
            <hr className="my-4 border-ink-900/8" />
            <div className="flex items-end justify-between">
              <span className="text-[13px] font-medium text-ink-600">
                {t.summary_total}
              </span>
              <span className="font-display text-[26px] font-bold tracking-tight tabular-nums text-ink-900">
                {formatIDR(total)}
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-400">
              {t.summary_unique_help}
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={submitting}
            className="btn-primary w-full text-[15px] py-3.5"
          >
            {submitting ? t.checkout_btn_loading : t.checkout_btn}
            <Wa />
          </button>
          <p className="text-center text-[11px] text-ink-400">
            {t.checkout_terms}
          </p>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
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
      <span
        className={subtle ? "text-ink-400" : "font-semibold text-ink-900"}
      >
        {value}
      </span>
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
