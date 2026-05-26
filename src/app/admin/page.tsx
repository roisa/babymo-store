"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { readLocalOrders, updateLocalOrder, writeLocalOrders } from "@/lib/orders";
import { decrementStockFor } from "@/lib/stock";
import { downloadCSV, ordersToCSV } from "@/lib/csv";
import { useToast } from "@/context/ToastContext";
import { useLang } from "@/context/LanguageContext";
import { formatDateID, formatIDR } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Order, OrderStatus } from "@/types";

type Tab =
  | "all"
  | "pending_payment"
  | "waiting_verification"
  | "paid"
  | "packed"
  | "shipped"
  | "completed";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<Tab>("waiting_verification");
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const { notify } = useToast();
  const { t } = useLang();

  const TABS: { key: Tab; label: string; emoji: string }[] = [
    { key: "all", label: t.admin_tab_all, emoji: "✨" },
    { key: "pending_payment", label: t.admin_tab_pending, emoji: "💭" },
    { key: "waiting_verification", label: t.admin_tab_verify, emoji: "🔍" },
    { key: "paid", label: t.admin_tab_paid, emoji: "💖" },
    { key: "packed", label: t.admin_tab_packed, emoji: "📦" },
    { key: "shipped", label: t.admin_tab_shipped, emoji: "🚚" },
    { key: "completed", label: t.admin_tab_completed, emoji: "🌱" },
  ];

  useEffect(() => {
    if (sessionStorage.getItem("babymo:admin") === "1") setUnlocked(true);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked]);

  const refresh = async () => {
    let all = readLocalOrders();
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data.orders) && data.orders.length > 0) {
        all = data.orders as Order[];
        writeLocalOrders(all);
      }
    } catch {}
    setOrders(all);
  };

  const filtered = useMemo(() => {
    let list = orders;
    if (tab !== "all") list = list.filter((o) => o.order_status === tab);
    if (q.trim()) {
      const term = q.toLowerCase();
      list = list.filter(
        (o) =>
          o.order_id.toLowerCase().includes(term) ||
          o.customer_name.toLowerCase().includes(term) ||
          o.whatsapp.includes(term) ||
          o.city.toLowerCase().includes(term),
      );
    }
    return list;
  }, [orders, tab, q]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    for (const o of orders) c[o.order_status] = (c[o.order_status] || 0) + 1;
    return c;
  }, [orders]);

  const updateStatus = async (orderId: string, patch: Partial<Order>) => {
    const updated = updateLocalOrder(orderId, patch);
    if (updated) {
      setOrders((all) =>
        all.map((o) => (o.order_id === orderId ? updated : o)),
      );
    }
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
    } catch {}
    notify(t.toast_order_updated, "success");
  };

  /**
   * Single helper that the OrderCard buttons route through.
   * 1. Apply the right status patch
   * 2. Send the matching transactional WhatsApp (paid / shipped /
   *    completed) — soft-fails if FONNTE_API_KEY isn't configured yet
   */
  const transition = async (
    order: Order,
    next:
      | { status: "paid" }
      | { status: "pending_payment"; reject: true }
      | { status: "packed" }
      | { status: "shipped"; tracking?: string }
      | { status: "completed" },
  ) => {
    const patch: Partial<Order> = { order_status: next.status };
    if (next.status === "paid") {
      patch.payment_status = "verified";
      patch.verified_at = new Date().toISOString();
    } else if (next.status === "pending_payment") {
      patch.payment_status = "rejected";
    }

    // Stock auto-decrement on first transition into "paid".
    // Idempotent: only fires when the order wasn't already paid (or past
    // paid in the flow — packed/shipped/completed all already counted).
    const alreadyCounted = ["paid", "packed", "shipped", "completed"].includes(
      order.order_status,
    );
    if (next.status === "paid" && !alreadyCounted) {
      decrementStockFor(order.items);
      notify(t.toast_stock_decremented(order.items.length), "default");
    }

    await updateStatus(order.order_id, patch);

    const waType =
      next.status === "paid"
        ? "payment_confirmed"
        : next.status === "shipped"
          ? "order_shipped"
          : next.status === "completed"
            ? "thank_you"
            : null;
    if (!waType) return;

    try {
      const res = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: waType,
          order: { ...order, ...patch },
          tracking: next.status === "shipped" ? next.tracking : undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (data.ok) {
        notify(t.toast_wa_sent, "success");
      } else if (data.error?.includes("FONNTE_API_KEY")) {
        notify(t.toast_wa_gateway_off, "default");
      } else {
        notify(t.toast_wa_failed, "error");
      }
    } catch {
      notify(t.toast_wa_failed, "error");
    }
  };

  if (!unlocked) {
    return (
      <div className="container-soft max-w-sm py-24 text-center">
        <h1 className="font-display text-[2rem] font-bold tracking-[-0.025em] text-ink-900">
          {t.admin_title}
        </h1>
        <p className="mt-2 text-[13.5px] text-ink-400">{t.admin_subtitle}</p>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder={t.admin_passcode_ph}
          className="input mt-6 text-center tracking-[0.3em]"
        />
        <button
          onClick={() => {
            const expected =
              process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "babymo2026";
            if (passcode === expected) {
              sessionStorage.setItem("babymo:admin", "1");
              setUnlocked(true);
            } else notify(t.toast_wrong_passcode, "error");
          }}
          className="btn-primary mt-3 w-full"
        >
          {t.admin_unlock}
        </button>
        <p className="mt-4 text-[11px] text-ink-400">{t.admin_passcode_hint}</p>
      </div>
    );
  }

  return (
    <div className="container-soft py-10 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="chip uppercase tracking-[0.12em]">
            {t.admin_dashboard_eyebrow}
          </span>
          <h1 className="mt-4 font-display text-[2rem] font-bold tracking-[-0.025em] text-ink-900 sm:text-[2.5rem]">
            {t.admin_dashboard_title}
          </h1>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              const today = new Date().toISOString().slice(0, 10);
              downloadCSV(`babymo-orders-${today}.csv`, ordersToCSV(filtered));
            }}
            className="btn-soft text-[12px] px-4 py-2"
            title={
              t.admin_export_csv_title.replace("{n}", String(filtered.length))
            }
          >
            ⬇ CSV
          </button>
          <button onClick={refresh} className="btn-soft text-[12px] px-4 py-2">
            {t.admin_refresh}
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("babymo:admin");
              setUnlocked(false);
            }}
            className="btn-ghost text-[12px] px-4 py-2"
          >
            {t.admin_lock}
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {TABS.map((tabItem) => (
          <button
            key={tabItem.key}
            onClick={() => setTab(tabItem.key)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-semibold transition-all ease-spring active:scale-95 ${
              tab === tabItem.key
                ? "bg-ink-900 text-white shadow-ios"
                : "bg-white text-ink-600 ring-1 ring-ink-900/8 hover:bg-ink-900/[0.03]"
            }`}
          >
            <span>{tabItem.emoji}</span>
            {tabItem.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                tab === tabItem.key
                  ? "bg-white/20 text-white"
                  : "bg-ink-900/[0.05] text-ink-600"
              }`}
            >
              {counts[tabItem.key] || 0}
            </span>
          </button>
        ))}
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.admin_search_ph}
        className="input mt-3"
      />

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-ios-2xl bg-white p-12 text-center shadow-ios ring-1 ring-ink-900/6">
          <p className="text-3xl">🌸</p>
          <p className="mt-3 font-display text-[18px] font-bold tracking-[-0.02em] text-ink-900">
            {t.admin_empty_title}
          </p>
          <p className="mt-2 text-[13px] text-ink-400">{t.admin_empty_sub}</p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {filtered.map((o) => (
            <OrderCard
              key={o.order_id}
              order={o}
              open={openId === o.order_id}
              onToggle={() =>
                setOpenId((id) => (id === o.order_id ? null : o.order_id))
              }
              onTransition={(next) => transition(o, next)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type TransitionInput =
  | { status: "paid" }
  | { status: "pending_payment"; reject: true }
  | { status: "packed" }
  | { status: "shipped"; tracking?: string }
  | { status: "completed" };

function OrderCard({
  order,
  open,
  onToggle,
  onTransition,
}: {
  order: Order;
  open: boolean;
  onToggle: () => void;
  onTransition: (next: TransitionInput) => void;
}) {
  const { notify } = useToast();
  const { t } = useLang();

  const copyAddress = () => {
    const text = `${order.customer_name}\n${order.whatsapp}\n${order.address}\n${order.city} ${order.postal_code}`;
    navigator.clipboard.writeText(text).then(
      () => notify(t.toast_address_copied, "success"),
      () => notify(t.toast_address_copy_fail, "error"),
    );
  };

  return (
    <article className="overflow-hidden rounded-ios-2xl bg-white shadow-ios ring-1 ring-ink-900/6">
      <button
        onClick={onToggle}
        className="grid w-full grid-cols-[1fr_auto] gap-2 px-5 py-4 text-left transition hover:bg-ink-900/[0.02]"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold text-ink-400">
              {order.order_id}
            </span>
            <StatusBadge status={order.order_status} />
          </div>
          <p className="mt-1 truncate text-[14px] font-semibold tracking-[-0.01em] text-ink-900">
            {order.customer_name} · {order.city}
          </p>
          <p className="text-[11px] text-ink-400">
            {formatDateID(order.created_at)} · {order.items.length} item
            {order.items.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-[17px] font-bold tracking-tight tabular-nums text-ink-900">
            {formatIDR(order.total_payment)}
          </p>
          <p className="text-[11px] tabular-nums text-ink-400">
            +{order.unique_code}
          </p>
        </div>
      </button>

      {open && (
        <div className="border-t border-ink-900/6 bg-warmwhite/40 px-5 py-5 backdrop-blur-xl">
          <div className="grid gap-5 sm:grid-cols-[1fr_220px]">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400">
                {t.admin_card_items}
              </h4>
              <ul className="mt-2 space-y-1.5 text-[13.5px]">
                {order.items.map((i) => (
                  <li
                    key={i.productId}
                    className="flex items-center justify-between"
                  >
                    <span className="text-ink-700">
                      {i.quantity}× {i.name}
                    </span>
                    <span className="font-medium tabular-nums text-ink-600">
                      {formatIDR(i.price * i.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <h4 className="mt-5 text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400">
                {t.admin_card_shipping}
              </h4>
              <p className="mt-1 text-[13.5px] font-semibold text-ink-700">
                {order.customer_name}
              </p>
              <p className="text-[13.5px] text-ink-700">{order.whatsapp}</p>
              <p className="text-[13.5px] text-ink-700">{order.address}</p>
              <p className="text-[13.5px] text-ink-700">
                {order.city} {order.postal_code}
              </p>
              {order.delivery_notes && (
                <p className="mt-2 rounded-ios bg-tangerine-50 p-3 text-[13px] italic text-ink-700 ring-1 ring-tangerine-100">
                  &ldquo;{order.delivery_notes}&rdquo;
                </p>
              )}
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400">
                {t.admin_card_proof}
              </h4>

              {/* Expected amount — admin compares this to the uploaded proof */}
              <div className="mt-2 rounded-ios bg-grass-50 px-3 py-2 ring-1 ring-grass-100">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-grass-700">
                  {t.admin_card_expected}
                </p>
                <p className="mt-0.5 font-display text-[18px] font-bold tabular-nums text-ink-900">
                  {formatIDR(order.total_payment)}
                </p>
                <p className="text-[10px] tabular-nums text-ink-400">
                  +{order.unique_code} {t.admin_card_unique}
                </p>
              </div>

              {order.proof_image ? (
                <a
                  href={order.proof_image}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={order.proof_image}
                    alt="proof"
                    className="max-h-40 w-full rounded-ios object-contain ring-1 ring-ink-900/[0.08]"
                  />
                </a>
              ) : (
                <div className="mt-2 rounded-ios bg-white p-4 text-center text-[11px] text-ink-400 ring-1 ring-dashed ring-ink-900/15">
                  {t.admin_card_proof_empty}
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={buildWhatsAppLink(
                `Halo ${order.customer_name} 🌱 ini Baby Mo, mau update tentang order ${order.order_id} kamu ✨`,
                order.whatsapp,
              )}
              target="_blank"
              rel="noreferrer"
              className="btn-soft text-[12px] px-4 py-2"
            >
              {t.admin_action_wa}
            </a>
            <button onClick={copyAddress} className="btn-soft text-[12px] px-4 py-2">
              {t.admin_action_copy}
            </button>
            <Link
              href={`/shipping-label/${order.order_id}`}
              target="_blank"
              className="btn-soft text-[12px] px-4 py-2"
            >
              {t.admin_action_label}
            </Link>

            {order.order_status === "waiting_verification" && (
              <>
                <button
                  onClick={() => onTransition({ status: "paid" })}
                  className="btn-primary text-[12px] px-4 py-2"
                >
                  {t.admin_action_approve}
                </button>
                <button
                  onClick={() =>
                    onTransition({
                      status: "pending_payment",
                      reject: true,
                    })
                  }
                  className="btn-ghost text-[12px] px-4 py-2"
                >
                  {t.admin_action_reject}
                </button>
              </>
            )}
            {order.order_status === "paid" && (
              <button
                onClick={() => onTransition({ status: "packed" })}
                className="btn-primary text-[12px] px-4 py-2"
              >
                {t.admin_action_packed}
              </button>
            )}
            {order.order_status === "packed" && (
              <button
                onClick={() => {
                  const tracking =
                    window.prompt(t.admin_tracking_prompt)?.trim() || undefined;
                  onTransition({ status: "shipped", tracking });
                }}
                className="btn-primary text-[12px] px-4 py-2"
              >
                {t.admin_action_shipped}
              </button>
            )}
            {order.order_status === "shipped" && (
              <button
                onClick={() => onTransition({ status: "completed" })}
                className="btn-primary text-[12px] px-4 py-2"
              >
                {t.admin_action_completed}
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, { label: string; cls: string }> = {
    pending_payment: { label: "pending", cls: "bg-ink-900/[0.06] text-ink-600" },
    waiting_verification: {
      label: "verify",
      cls: "bg-tangerine-50 text-tangerine-600 ring-1 ring-tangerine-100",
    },
    paid: { label: "paid", cls: "bg-grass-50 text-grass-700 ring-1 ring-grass-100" },
    packed: { label: "packed", cls: "bg-sky-100 text-ink-700" },
    shipped: { label: "shipped", cls: "bg-grass-100 text-grass-800" },
    completed: { label: "completed", cls: "bg-grass-fade text-white" },
    cancelled: { label: "cancelled", cls: "bg-red-50 text-red-700 ring-1 ring-red-100" },
  };
  const s = map[status];
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${s.cls}`}
    >
      {s.label}
    </span>
  );
}
