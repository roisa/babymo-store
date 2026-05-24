"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLocalOrder, updateLocalOrder } from "@/lib/orders";
import { useToast } from "@/context/ToastContext";
import { useLang } from "@/context/LanguageContext";
import { formatIDR } from "@/lib/utils";
import { buildWhatsAppLink, getStoreWhatsApp } from "@/lib/whatsapp";
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
  const [secondsLeft, setSecondsLeft] = useState(60 * 60);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setOrder(getLocalOrder(orderId));
  }, [orderId]);

  useEffect(() => {
    const id = setInterval(
      () => setSecondsLeft((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => clearInterval(id);
  }, []);

  if (hydrated && !order) {
    return (
      <div className="container-soft py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-ink-900">
          {t.payment_not_found_title}
        </h1>
        <p className="mt-2 text-sm text-ink-400">{t.payment_not_found_sub}</p>
        <a
          href={buildWhatsAppLink(
            `Halo Baby Mo, saya mau cek status order ${orderId}`,
          )}
          target="_blank"
          rel="noreferrer"
          className="btn-orange mt-6 inline-flex"
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

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="container-soft max-w-2xl py-8 sm:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs font-semibold text-ink-400 hover:text-grass-600"
      >
        {t.back_home}
      </Link>

      <div className="mt-4 flex flex-col items-center text-center">
        <span className="chip-orange inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tangerine-500" />
          {t.payment_waiting}
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          {t.payment_title}
        </h1>
        <p className="mt-1 max-w-md text-sm text-ink-600">
          {t.payment_subtitle}
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-glow ring-2 ring-grass-100">
        <div className="bg-grass-400 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest opacity-80">
                {t.payment_order_id}
              </p>
              <p className="font-mono text-sm font-bold">{order.order_id}</p>
            </div>
            <div className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold backdrop-blur">
              ⏱ {mm}:{ss}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center px-6 py-8">
          <div className="relative flex h-56 w-56 items-center justify-center rounded-3xl bg-warmwhite ring-2 ring-grass-200">
            <QrisPlaceholder />
            <span className="absolute -bottom-3 rounded-full bg-grass-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              QRIS
            </span>
          </div>

          <p className="mt-8 text-xs font-semibold text-ink-400">
            {t.payment_amount_caption}
          </p>
          <p className="mt-1 font-display text-4xl font-bold text-grass-600">
            {formatIDR(order.total_payment)}
          </p>
          <p className="mt-1 text-[11px] text-ink-400">
            {t.payment_unique_caption(formatIDR(order.unique_code))}
          </p>
          <button onClick={handleCopy} className="btn-soft mt-3 text-xs">
            {t.payment_copy}
          </button>
        </div>

        <div className="border-t-2 border-grass-100 bg-grass-50/60 px-6 py-5">
          <span className="chip-orange uppercase tracking-wider">
            {t.payment_steps_title}
          </span>
          <ol className="mt-3 space-y-2 text-sm text-ink-700">
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
          className={`btn-orange w-full text-base ${uploading ? "opacity-60" : ""}`}
        >
          {uploading
            ? t.payment_uploading
            : order.proof_image
              ? t.payment_upload_replace
              : t.payment_upload}
        </span>
      </label>

      {order.proof_image && (
        <div className="mt-4 rounded-2xl bg-cream-100 p-4 ring-2 ring-grass-100">
          <p className="text-xs font-semibold text-ink-600">
            {t.payment_proof_caption}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={order.proof_image}
            alt="payment proof"
            className="mt-2 max-h-48 w-full rounded-xl object-contain"
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
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-grass-700 ring-2 ring-grass-200 hover:bg-grass-50"
      >
        {t.payment_help}
      </a>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-grass-400 text-[11px] font-bold text-white">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

function QrisPlaceholder() {
  return (
    <svg viewBox="0 0 100 100" className="h-40 w-40" aria-hidden>
      {Array.from({ length: 12 }).map((_, y) =>
        Array.from({ length: 12 }).map((__, x) => {
          const v = (x * 7 + y * 13 + x * y) % 5;
          const filled = v < 2 || (x + y) % 6 === 0;
          if (!filled) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x * 8 + 2}
              y={y * 8 + 2}
              width="7"
              height="7"
              rx="1"
              fill="#162818"
            />
          );
        }),
      )}
      {[
        [2, 2],
        [74, 2],
        [2, 74],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <rect x={cx} y={cy} width="24" height="24" rx="4" fill="#178533" />
          <rect x={cx + 4} y={cy + 4} width="16" height="16" rx="2" fill="#fff" />
          <rect x={cx + 8} y={cy + 8} width="8" height="8" rx="1" fill="#178533" />
        </g>
      ))}
    </svg>
  );
}
