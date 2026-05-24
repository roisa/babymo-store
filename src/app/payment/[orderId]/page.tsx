"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLocalOrder, updateLocalOrder } from "@/lib/orders";
import { useToast } from "@/context/ToastContext";
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

  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60 * 60); // 1h soft window
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
        <h1 className="font-display text-2xl text-ink-900">
          Hmm, we can't find that order on this device.
        </h1>
        <p className="mt-2 text-sm text-ink-400">
          If you completed checkout, your order is safe with us — just message us on WhatsApp.
        </p>
        <a
          href={buildWhatsAppLink(`Halo Baby Mo, saya mau cek status order ${orderId}`)}
          target="_blank"
          rel="noreferrer"
          className="btn-pink mt-6 inline-flex"
        >
          Chat us on WhatsApp
        </a>
      </div>
    );
  }
  if (!order) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(order.total_payment));
      notify("Amount copied 🌷", "success");
    } catch {
      notify("Couldn't copy. Please copy manually.", "error");
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

      notify("Proof uploaded — we'll verify shortly 💌", "success");
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
        className="inline-flex items-center gap-1 text-xs text-ink-400 hover:text-ink-900"
      >
        ← Back to home
      </Link>

      <div className="mt-4 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-pinky-100 px-3 py-1 text-xs text-pinky-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pinky-400" />
          Waiting for your payment
        </span>
        <h1 className="mt-3 font-display text-3xl text-ink-900 sm:text-4xl">
          Almost there.
        </h1>
        <p className="mt-1 max-w-md text-sm text-ink-600">
          Scan the QRIS below and pay the exact amount. Then upload your proof — we'll verify within a few minutes.
        </p>
      </div>

      {/* QRIS card */}
      <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-glow ring-1 ring-ink-900/5">
        <div className="bg-warm-gradient px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-ink-400">Order ID</p>
              <p className="font-mono text-sm text-ink-900">{order.order_id}</p>
            </div>
            <div className="rounded-full bg-white/80 px-3 py-1 text-[11px] text-ink-600 backdrop-blur">
              ⏱ {mm}:{ss}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center px-6 py-8">
          <div className="relative flex h-56 w-56 items-center justify-center rounded-3xl bg-warmwhite ring-1 ring-ink-900/10">
            <QrisPlaceholder />
            <span className="absolute -bottom-3 rounded-full bg-ink-900 px-3 py-1 text-[10px] uppercase tracking-widest text-cream-50">
              QRIS
            </span>
          </div>

          <p className="mt-8 text-xs text-ink-400">Pay exactly this amount</p>
          <p className="mt-1 font-display text-4xl text-ink-900">
            {formatIDR(order.total_payment)}
          </p>
          <p className="mt-1 text-[11px] text-ink-400">
            includes unique code {formatIDR(order.unique_code)}
          </p>
          <button onClick={handleCopy} className="btn-soft mt-3 text-xs">
            Copy amount
          </button>
        </div>

        <div className="border-t border-ink-900/5 bg-cream-50 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-pinky-500">
            5 gentle steps
          </p>
          <ol className="mt-2 space-y-2 text-sm text-ink-700">
            <Step n={1}>Open your e-wallet or banking app</Step>
            <Step n={2}>Scan the QRIS above</Step>
            <Step n={3}>Pay the exact amount, including the unique code</Step>
            <Step n={4}>Upload your payment proof below</Step>
            <Step n={5}>We'll confirm via WhatsApp 💖</Step>
          </ol>
        </div>
      </div>

      {/* Upload */}
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
          className={`btn-pink w-full text-base ${uploading ? "opacity-60" : ""}`}
        >
          {uploading ? "Uploading…" : order.proof_image ? "Replace payment proof" : "Upload payment proof"}
        </span>
      </label>

      {order.proof_image && (
        <div className="mt-4 rounded-2xl bg-cream-100 p-4">
          <p className="text-xs text-ink-600">Uploaded proof preview:</p>
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
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/70 px-5 py-3 text-sm text-ink-600 ring-1 ring-ink-900/10 hover:bg-white"
      >
        Need help? Chat us on WhatsApp
      </a>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pinky-200 text-[11px] font-medium text-ink-900">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

/** Decorative QRIS placeholder — replace with merchant's real QR image. */
function QrisPlaceholder() {
  return (
    <svg viewBox="0 0 100 100" className="h-40 w-40" aria-hidden>
      {Array.from({ length: 12 }).map((_, y) =>
        Array.from({ length: 12 }).map((__, x) => {
          // pseudo-random but stable
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
              fill="#2A241D"
            />
          );
        }),
      )}
      {/* corner squares */}
      {[
        [2, 2],
        [74, 2],
        [2, 74],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <rect x={cx} y={cy} width="24" height="24" rx="4" fill="#2A241D" />
          <rect x={cx + 4} y={cy + 4} width="16" height="16" rx="2" fill="#fff" />
          <rect x={cx + 8} y={cy + 8} width="8" height="8" rx="1" fill="#2A241D" />
        </g>
      ))}
    </svg>
  );
}
