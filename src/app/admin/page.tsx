"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { readLocalOrders, updateLocalOrder, writeLocalOrders } from "@/lib/orders";
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

  if (!unlocked) {
    return (
      <div className="container-soft max-w-md py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-ink-900">
          {t.admin_title}
        </h1>
        <p className="mt-2 text-sm text-ink-400">{t.admin_subtitle}</p>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder={t.admin_passcode_ph}
          className="input mt-6 text-center tracking-widest"
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
    <div className="container-soft py-8 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="chip uppercase tracking-wider">
            {t.admin_dashboard_eyebrow}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            {t.admin_dashboard_title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={refresh} className="btn-soft text-xs">
            {t.admin_refresh}
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("babymo:admin");
              setUnlocked(false);
            }}
            className="btn-ghost text-xs"
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
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${
              tab === tabItem.key
                ? "bg-grass-400 text-white shadow-pop"
                : "bg-white text-ink-600 ring-2 ring-grass-100 hover:bg-grass-50"
            }`}
          >
            <span>{tabItem.emoji}</span>
            {tabItem.label}
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                tab === tabItem.key
                  ? "bg-white/20 text-white"
                  : "bg-grass-50 text-grass-700"
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
        className="input mt-2"
      />

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-white p-12 text-center shadow-card ring-2 ring-grass-100">
          <p className="text-3xl">🌸</p>
          <p className="mt-2 font-display text-xl font-bold text-ink-900">
            {t.admin_empty_title}
          </p>
          <p className="mt-1 text-sm text-ink-400">{t.admin_empty_sub}</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {filtered.map((o) => (
            <OrderCard
              key={o.order_id}
              order={o}
              open={openId === o.order_id}
              onToggle={() =>
                setOpenId((id) => (id === o.order_id ? null : o.order_id))
              }
              onUpdate={(patch) => updateStatus(o.order_id, patch)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderCard({
  order,
  open,
  onToggle,
  onUpdate,
}: {
  order: Order;
  open: boolean;
  onToggle: () => void;
  onUpdate: (patch: Partial<Order>) => void;
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
    <article className="overflow-hidden rounded-3xl bg-white shadow-card ring-2 ring-grass-100">
      <button
        onClick={onToggle}
        className="grid w-full grid-cols-[1fr_auto] gap-2 px-5 py-4 text-left"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-ink-400">
              {order.order_id}
            </span>
            <StatusBadge status={order.order_status} />
          </div>
          <p className="mt-1 truncate text-sm font-bold text-ink-900">
            {order.customer_name} · {order.city}
          </p>
          <p className="text-[11px] text-ink-400">
            {formatDateID(order.created_at)} · {order.items.length} item
            {order.items.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-lg font-bold text-grass-600">
            {formatIDR(order.total_payment)}
          </p>
          <p className="text-[11px] text-ink-400">+{order.unique_code}</p>
        </div>
      </button>

      {open && (
        <div className="border-t-2 border-grass-100 bg-cream-50/60 px-5 py-5">
          <div className="grid gap-5 sm:grid-cols-[1fr_220px]">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-grass-700">
                {t.admin_card_items}
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm">
                {order.items.map((i) => (
                  <li
                    key={i.productId}
                    className="flex items-center justify-between"
                  >
                    <span className="text-ink-700">
                      {i.quantity}× {i.name}
                    </span>
                    <span className="font-semibold text-ink-600">
                      {formatIDR(i.price * i.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <h4 className="mt-5 text-xs font-bold uppercase tracking-widest text-grass-700">
                {t.admin_card_shipping}
              </h4>
              <p className="mt-1 text-sm font-semibold text-ink-700">
                {order.customer_name}
              </p>
              <p className="text-sm text-ink-700">{order.whatsapp}</p>
              <p className="text-sm text-ink-700">{order.address}</p>
              <p className="text-sm text-ink-700">
                {order.city} {order.postal_code}
              </p>
              {order.delivery_notes && (
                <p className="mt-2 rounded-2xl bg-tangerine-100 p-3 text-sm italic text-ink-700 ring-1 ring-tangerine-200">
                  &ldquo;{order.delivery_notes}&rdquo;
                </p>
              )}
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-grass-700">
                {t.admin_card_proof}
              </h4>
              {order.proof_image ? (
                <a href={order.proof_image} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={order.proof_image}
                    alt="proof"
                    className="mt-2 max-h-40 w-full rounded-2xl object-contain ring-2 ring-grass-100"
                  />
                </a>
              ) : (
                <div className="mt-2 rounded-2xl bg-white p-4 text-center text-xs text-ink-400 ring-2 ring-dashed ring-grass-200">
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
              className="btn-soft text-xs"
            >
              {t.admin_action_wa}
            </a>
            <button onClick={copyAddress} className="btn-soft text-xs">
              {t.admin_action_copy}
            </button>
            <Link
              href={`/shipping-label/${order.order_id}`}
              target="_blank"
              className="btn-soft text-xs"
            >
              {t.admin_action_label}
            </Link>

            {order.order_status === "waiting_verification" && (
              <>
                <button
                  onClick={() =>
                    onUpdate({
                      order_status: "paid",
                      payment_status: "verified",
                      verified_at: new Date().toISOString(),
                    })
                  }
                  className="btn-primary text-xs"
                >
                  {t.admin_action_approve}
                </button>
                <button
                  onClick={() =>
                    onUpdate({
                      order_status: "pending_payment",
                      payment_status: "rejected",
                    })
                  }
                  className="btn-ghost text-xs"
                >
                  {t.admin_action_reject}
                </button>
              </>
            )}
            {order.order_status === "paid" && (
              <button
                onClick={() => onUpdate({ order_status: "packed" })}
                className="btn-primary text-xs"
              >
                {t.admin_action_packed}
              </button>
            )}
            {order.order_status === "packed" && (
              <button
                onClick={() => onUpdate({ order_status: "shipped" })}
                className="btn-primary text-xs"
              >
                {t.admin_action_shipped}
              </button>
            )}
            {order.order_status === "shipped" && (
              <button
                onClick={() => onUpdate({ order_status: "completed" })}
                className="btn-primary text-xs"
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
    pending_payment: { label: "pending", cls: "bg-cream-100 text-ink-600" },
    waiting_verification: {
      label: "verify",
      cls: "bg-tangerine-100 text-tangerine-600",
    },
    paid: { label: "paid", cls: "bg-grass-100 text-grass-700" },
    packed: { label: "packed", cls: "bg-sky-100 text-ink-700" },
    shipped: { label: "shipped", cls: "bg-grass-200 text-grass-900" },
    completed: { label: "completed", cls: "bg-grass-400 text-white" },
    cancelled: { label: "cancelled", cls: "bg-red-100 text-red-700" },
  };
  const s = map[status];
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.cls}`}
    >
      {s.label}
    </span>
  );
}
