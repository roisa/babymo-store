"use client";

import type { OrderStatus } from "@/types";
import { useLang } from "@/context/LanguageContext";

/**
 * Five customer-facing steps. Internal statuses fold into these:
 *   pending_payment       → step 1
 *   waiting_verification  → step 2
 *   paid OR packed        → step 3 (preparing)
 *   shipped               → step 4
 *   completed             → step 5
 *
 * `cancelled` short-circuits into its own banner above the timeline.
 */
const STEPS_ID = [
  { key: "pay", label: "Menunggu pembayaran" },
  { key: "verify", label: "Memverifikasi" },
  { key: "prep", label: "Sedang dipack" },
  { key: "ship", label: "Dikirim" },
  { key: "done", label: "Sampai" },
] as const;

const STEPS_EN = [
  { key: "pay", label: "Awaiting payment" },
  { key: "verify", label: "Verifying" },
  { key: "prep", label: "Packing" },
  { key: "ship", label: "Shipping" },
  { key: "done", label: "Delivered" },
] as const;

function statusToStep(status: OrderStatus): number {
  switch (status) {
    case "pending_payment":
      return 0;
    case "waiting_verification":
      return 1;
    case "paid":
    case "packed":
      return 2;
    case "shipped":
      return 3;
    case "completed":
      return 4;
    default:
      return -1; // cancelled
  }
}

export default function OrderTimeline({ status }: { status: OrderStatus }) {
  const { lang } = useLang();
  const steps = lang === "id" ? STEPS_ID : STEPS_EN;
  const currentIdx = statusToStep(status);

  if (status === "cancelled") {
    return (
      <div className="rounded-ios-xl bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700 ring-1 ring-red-100">
        {lang === "id" ? "Pesanan dibatalkan" : "Order cancelled"}
      </div>
    );
  }

  return (
    <ol
      className="grid gap-3 sm:grid-cols-5"
      aria-label={lang === "id" ? "Status pesanan" : "Order status"}
    >
      {steps.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <li
            key={step.key}
            className="relative flex items-start gap-3 sm:flex-col sm:items-stretch sm:gap-2"
            aria-current={active ? "step" : undefined}
          >
            {/* dot */}
            <div className="relative flex shrink-0 items-center sm:block">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold ring-2 ${
                  done
                    ? "bg-grass-fade text-white ring-grass-100"
                    : active
                      ? "bg-tangerine-fade text-white ring-tangerine-100"
                      : "bg-white text-ink-400 ring-ink-900/[0.08]"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              {/* mobile vertical connector */}
              {i < steps.length - 1 && (
                <span
                  className={`absolute left-3.5 top-7 h-full w-px sm:hidden ${
                    done ? "bg-grass-300" : "bg-ink-900/[0.08]"
                  }`}
                />
              )}
            </div>

            {/* label */}
            <div className="flex-1 pb-3 sm:pb-0">
              <p
                className={`text-[12.5px] font-semibold leading-tight ${
                  active
                    ? "text-tangerine-600"
                    : done
                      ? "text-grass-700"
                      : "text-ink-400"
                }`}
              >
                {step.label}
              </p>
            </div>

            {/* desktop horizontal connector */}
            {i < steps.length - 1 && (
              <span
                className={`absolute left-[3.5rem] top-3.5 hidden h-px w-[calc(100%-3.5rem)] sm:block ${
                  done ? "bg-grass-300" : "bg-ink-900/[0.08]"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
