"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLocalOrder, updateLocalOrder } from "@/lib/orders";
import { useToast } from "@/context/ToastContext";
import { useLang } from "@/context/LanguageContext";
import { formatIDR } from "@/lib/utils";
import { buildWhatsAppLink, getStoreWhatsApp } from "@/lib/whatsapp";
import QrisImage from "@/components/QrisImage";
import OrderTimeline from "@/components/OrderTimeline";
import type { Order } from "@/types";

export default function PaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const router = useRouter();
  const { notify } = useToast();
  const { t } = useLang();

  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setOrder(getLocalOrder(orderId));
  }, [orderId]);

  if (hydrated && !order) {
    return (
      <div className="container-soft py-24 text-center">
        <h1 className="font-display text-[1.75rem] font-bold tracking-[-0.02em] text-ink-900">
          {t.payment_not_found_title}
        </h1>
        <p className="mt-3 text-[14px] text-ink-400">
          {t.payment_not_found_sub}
        </p>
        <a
          href={buildWhatsAppLink(
            `Halo Baby Mo, saya mau cek status order ${orderId}`,
          )}
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-6 inline-flex"
        >
          {t.payment_chat}
        </a>
      </div>
    );
  }
  if (!order) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(order.total_payment));
      notify(t.toast_amount_copied, "success");
    } catch {
      notify(t.toast_amount_copy_fail, "error");
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const reader = new FileReader();
      const dataUrl: string = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const updated = updateLocalOrder(order.order_id, {
        proof_image: dataUrl,
        payment_status: "uploaded",
        order_status: "waiting_verification",
      });
      if (updated) setOrder(updated);

      try {
        await fetch("/api/upload-proof", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: order.order_id,
            proof_image: dataUrl,
          }),
        });
      } catch {}

      notify(t.toast_proof_uploaded, "success");
      setTimeout(() => router.push(`/order-success/${order.order_id}`), 700);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container-soft max-w-xl py-10 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-[12px] font-medium text-ink-400 transition hover:text-ink-700"
      >
        {t.back_home}
      </Link>

      <div className="mt-5 flex flex-col items-center text-center">
        <span className="chip-orange inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tangerine-500" />
          {t.payment_waiting}
        </span>
        <h1 className="mt-4 font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.025em] text-ink-900 sm:text-[2.5rem]">
          {t.payment_title}
        </h1>
        <p className="mt-2 max-w-md text-[14px] leading-relaxed text-ink-600">
          {t.payment_subtitle}
        </p>
      </div>

      <div className="mt-8 rounded-ios-2xl bg-white p-5 ring-1 ring-ink-900/[0.06] shadow-ios">
        <OrderTimeline status={order.order_status} />
      </div>

      <div className="mt-6 overflow-hidden rounded-ios-3xl bg-white shadow-ios-xl ring-1 ring-ink-900/6">
        <div className="border-b border-ink-900/6 bg-warmwhite/60 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-400">
                {t.payment_order_id}
              </p>
              <p className="mt-0.5 font-mono text-[13px] font-semibold tabular-nums text-ink-900">
                {order.order_id}
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-tangerine-50 px-3 py-1 text-[11px] font-semibold text-tangerine-600 ring-1 ring-tangerine-100">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-pulse-soft rounded-full bg-tangerine-400" />
                <span className="absolute inset-0 rounded-full bg-tangerine-400" />
              </span>
              {t.payment_waiting}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center px-6 py-10">
          <div className="relative flex h-56 w-56 items-center justify-center rounded-ios-2xl bg-warmwhite ring-1 ring-ink-900/[0.08] shadow-ios">
            <QrisImage />
            <span className="absolute -bottom-3 rounded-full bg-grass-fade px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-ios-grass">
              QRIS
            </span>
          </div>

          <p className="mt-9 text-[12px] font-medium text-ink-400">
            {t.payment_amount_caption}
          </p>
          <p className="mt-1 font-display text-[2.75rem] font-bold tracking-[-0.02em] tabular-nums text-ink-900">
            {formatIDR(order.total_payment)}
          </p>
          <p className="text-[11px] text-ink-400">
            {t.payment_unique_caption(formatIDR(order.unique_code))}
          </p>
          <button onClick={handleCopy} className="btn-soft mt-4 text-[12px]">
            {t.payment_copy}
          </button>
        </div>

        <div className="border-t border-ink-900/6 bg-warmwhite/60 px-6 py-5 backdrop-blur-xl">
          <span className="chip uppercase tracking-[0.12em]">
            {t.payment_steps_title}
          </span>
          <ol className="mt-4 space-y-2.5 text-[13.5px] text-ink-700">
            <Step n={1}>{t.payment_step_1}</Step>
            <Step n={2}>{t.payment_step_2}</Step>
            <Step n={3}>{t.payment_step_3}</Step>
            <Step n={4}>{t.payment_step_4}</Step>
            <Step n={5}>{t.payment_step_5}</Step>
          </ol>
        </div>
      </div>

      <label className="mt-6 block">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleUpload(f);
          }}
        />
        <span
          className={`btn-primary w-full text-[15px] py-3.5 ${uploading ? "opacity-60" : ""}`}
        >
          {uploading
            ? t.payment_uploading
            : order.proof_image
              ? t.payment_upload_replace
              : t.payment_upload}
        </span>
      </label>

      {order.proof_image && (
        <div className="mt-4 rounded-ios-xl bg-white p-4 ring-1 ring-ink-900/6 shadow-ios">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
            {t.payment_proof_caption}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={order.proof_image}
            alt="payment proof"
            className="mt-3 max-h-56 w-full rounded-ios object-contain"
          />
        </div>
      )}

      <a
        href={buildWhatsAppLink(
          `Halo Baby Mo, saya butuh bantuan untuk order ${order.order_id}`,
          getStoreWhatsApp(),
        )}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/70 px-5 py-3 text-[13px] font-semibold text-ink-700 ring-1 ring-ink-900/8 backdrop-blur-xl transition hover:bg-white"
      >
        {t.payment_help}
      </a>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-grass-fade text-[11px] font-semibold text-white shadow-ios-grass">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

