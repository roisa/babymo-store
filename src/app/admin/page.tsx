"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { readLocalOrders, updateLocalOrder, writeLocalOrders } from "@/lib/orders";
import { useToast } from "@/context/ToastContext";
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

const TABS: { key: Tab; label: string; emoji: string }[] = [
  { key: "all", label: "All", emoji: "✨" },
  { key: "pending_payment", label: "Pending payment", emoji: "💭" },
  { key: "waiting_verification", label: "Verify", emoji: "🔍" },
  { key: "paid", label: "Paid", emoji: "💖" },
  { key: "packed", label: "Packing", emoji: "📦" },
  { key: "shipped", label: "Shipped", emoji: "🚚" },
  { key: "completed", label: "Completed", emoji: "🌷" },
];

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<Tab>("waiting_verification");
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const { notify } = useToast();

  useEffect(() => {
    if (sessionStorage.getItem("babymo:admin") === "1") setUnlocked(true);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    refresh();
  }, [unlocked]);

  const refresh = async () => {
    // Local first
    let all = readLocalOrders();
    // Try server
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
      const t = q.toLowerCase();
      list = list.filter(
        (o) =>
          o.order_id.toLowerCase().includes(t) ||
          o.customer_name.toLowerCase().includes(t) ||
          o.whatsapp.includes(t) ||
          o.city.toLowerCase().includes(t),
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
    notify("Order updated 🌷", "success");
  };

  if (!unlocked) {
    return (
      <div className="container-soft max-w-md py-24 text-center">
        <h1 className="font-display text-3xl text-ink-900">Baby Mo admin</h1>
        <p className="mt-2 text-sm text-ink-400">
          Enter passcode to continue.
        </p>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Passcode"
          className="input mt-6 text-center tracking-widest"
        />
        <button
          onClick={() => {
            const expected =
              process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "babymo2026";
            if (passcode === expected) {
              sessionStorage.setItem("babymo:admin", "1");
              setUnlocked(true);
            } else notify("Wrong passcode", "error");
          }}
          className="btn-primary mt-3 w-full"
        >
          Unlock
        </button>
        <p className="mt-4 text-[11px] text-ink-400">
          Default dev passcode: <code>babymo2026</code> — change via <code>NEXT_PUBLIC_ADMIN_PASSCODE</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="container-soft py-8 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-pinky-500">
            dashboard
          </p>
          <h1 className="font-display text-3xl text-ink-900 sm:text-4xl">
            Today's gentle queue.
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={refresh} className="btn-soft text-xs">
            Refresh
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("babymo:admin");
              setUnlocked(false);
            }}
            className="btn-ghost text-xs"
          >
            Lock
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition ${
              tab === t.key
                ? "bg-ink-900 text-cream-50"
                : "bg-white text-ink-600 ring-1 ring-ink-900/10 hover:bg-cream-100"
            }`}
          >
            <span>{t.emoji}</span>
            {t.label}
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                tab === t.key
                  ? "bg-cream-50/20 text-cream-50"
                  : "bg-cream-100 text-ink-400"
              }`}
            >
              {counts[t.key] || 0}
            </span>
          </button>
        ))}
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search order ID, name, WhatsApp, city…"
        className="input mt-2"
      />

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-white p-12 text-center shadow-card ring-1 ring-ink-900/5">
          <p className="text-3xl">🌸</p>
          <p className="mt-2 font-display text-xl text-ink-900">
            All caught up here.
          </p>
          <p className="mt-1 text-sm text-ink-400">
            New orders show up here automatically — take a soft breath 💖
          </p>
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

  const copyAddress = () => {
    const text = `${order.customer_name}\n${order.whatsapp}\n${order.address}\n${order.city} ${order.postal_code}`;
    navigator.clipboard.writeText(text).then(
      () => notify("Address copied 📋", "success"),
      () => notify("Couldn't copy", "error"),
    );
  };

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-900/5">
      <button onClick={onToggle} className="grid w-full grid-cols-[1fr_auto] gap-2 px-5 py-4 text-left">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-400">
              {order.order_id}
            </span>
            <StatusBadge status={order.order_status} />
          </div>
          <p className="mt-1 text-sm font-medium text-ink-900 truncate">
            {order.customer_name} · {order.city}
          </p>
          <p className="text-[11px] text-ink-400">
            {formatDateID(order.created_at)} · {order.items.length} item
            {order.items.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-lg text-ink-900">
            {formatIDR(order.total_payment)}
          </p>
          <p className="text-[11px] text-ink-400">unique +{order.unique_code}</p>
        </div>
      </button>

      {open && (
        <div className="border-t border-ink-900/5 bg-cream-50 px-5 py-5">
          <div className="grid gap-5 sm:grid-cols-[1fr_220px]">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                Items
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm">
                {order.items.map((i) => (
                  <li key={i.productId} className="flex items-center justify-between">
                    <span className="text-ink-700">
                      {i.quantity}× {i.name}
                    </span>
                    <span className="text-ink-600">
                      {formatIDR(i.price * i.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <h4 className="mt-5 text-xs font-semibold uppercase tracking-widest text-ink-400">
                Shipping
              </h4>
              <p className="mt-1 text-sm text-ink-700">{order.customer_name}</p>
              <p className="text-sm text-ink-700">{order.whatsapp}</p>
              <p className="text-sm text-ink-700">{order.address}</p>
              <p className="text-sm text-ink-700">
                {order.city} {order.postal_code}
              </p>
              {order.delivery_notes && (
                <p className="mt-2 rounded-2xl bg-pinky-100 p-3 text-sm italic text-ink-700">
                  "{order.delivery_notes}"
                </p>
              )}
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                Payment proof
              </h4>
              {order.proof_image ? (
                <a href={order.proof_image} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={order.proof_image}
                    alt="proof"
                    className="mt-2 max-h-40 w-full rounded-2xl object-contain ring-1 ring-ink-900/10"
                  />
                </a>
              ) : (
                <div className="mt-2 rounded-2xl bg-white p-4 text-center text-xs text-ink-400 ring-1 ring-dashed ring-ink-900/15">
                  No proof uploaded yet
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={buildWhatsAppLink(
                `Halo ${order.customer_name} 🌷 ini Baby Mo, mau update tentang order ${order.order_id} kamu ✨`,
                order.whatsapp,
              )}
              target="_blank"
              rel="noreferrer"
              className="btn-soft text-xs"
            >
              💬 WhatsApp customer
            </a>
            <button onClick={copyAddress} className="btn-soft text-xs">
              📋 Copy address
            </button>
            <Link
              href={`/shipping-label/${order.order_id}`}
              target="_blank"
              className="btn-soft text-xs"
            >
              🏷 Print label
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
                  className="btn-pink text-xs"
                >
                  ✓ Approve payment
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
                  ✗ Reject
                </button>
              </>
            )}
            {order.order_status === "paid" && (
              <button
                onClick={() => onUpdate({ order_status: "packed" })}
                className="btn-pink text-xs"
              >
                📦 Mark packed
              </button>
            )}
            {order.order_status === "packed" && (
              <button
                onClick={() => onUpdate({ order_status: "shipped" })}
                className="btn-pink text-xs"
              >
                🚚 Mark shipped
              </button>
            )}
            {order.order_status === "shipped" && (
              <button
                onClick={() => onUpdate({ order_status: "completed" })}
                className="btn-pink text-xs"
              >
                🌷 Mark completed
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
    pending_payment: { label: "pending payment", cls: "bg-cream-100 text-ink-600" },
    waiting_verification: { label: "verify", cls: "bg-pinky-100 text-pinky-500" },
    paid: { label: "paid", cls: "bg-lavender-100 text-lavender-500" },
    packed: { label: "packed", cls: "bg-beige-100 text-ink-600" },
    shipped: { label: "shipped", cls: "bg-pinky-200 text-ink-900" },
    completed: { label: "completed", cls: "bg-ink-900 text-cream-50" },
    cancelled: { label: "cancelled", cls: "bg-red-100 text-red-700" },
  };
  const s = map[status];
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${s.cls}`}>
      {s.label}
    </span>
  );
}
