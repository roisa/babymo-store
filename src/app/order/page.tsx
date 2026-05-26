"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { readLocalOrders } from "@/lib/orders";
import { formatDateID, formatIDR } from "@/lib/utils";

export default function OrderLookupPage() {
  const { lang } = useLang();
  const router = useRouter();
  const [id, setId] = useState("");
  const [recent, setRecent] = useState<ReturnType<typeof readLocalOrders>>([]);

  useEffect(() => {
    setRecent(readLocalOrders().slice(0, 5));
  }, []);

  const lookup = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = id.trim().toUpperCase();
    if (cleaned) router.push(`/order/${cleaned}`);
  };

  return (
    <div className="container-soft max-w-xl py-12 sm:py-16">
      <span className="chip uppercase tracking-[0.12em]">
        {lang === "id" ? "cek pesanan" : "track order"}
      </span>
      <h1 className="mt-3 font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.025em] text-ink-900 sm:text-[2.5rem]">
        {lang === "id"
          ? "Lacak pesananmu di sini."
          : "Track your order here."}
      </h1>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-600">
        {lang === "id"
          ? "Masukkan ID pesanan kamu (mis. BM26052612345). ID-nya ada di pesan WhatsApp dan halaman terima kasih setelah checkout."
          : "Enter your order ID (e.g. BM26052612345). It's in the WhatsApp confirmation and the order-success page."}
      </p>

      <form onSubmit={lookup} className="mt-6 flex gap-2">
        <input
          autoFocus
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="BM26052612345"
          className="input font-mono tracking-wider"
          aria-label="Order ID"
        />
        <button type="submit" className="btn-primary shrink-0">
          {lang === "id" ? "Cek" : "Track"}
        </button>
      </form>

      {recent.length > 0 && (
        <div className="mt-10">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">
            {lang === "id"
              ? "Pesanan terakhir di perangkat ini"
              : "Recent orders on this device"}
          </h2>
          <ul className="mt-3 space-y-2">
            {recent.map((o) => (
              <li key={o.order_id}>
                <a
                  href={`/order/${o.order_id}`}
                  className="flex items-center justify-between gap-3 rounded-ios-xl bg-white p-4 ring-1 ring-ink-900/[0.06] shadow-ios transition hover:-translate-y-0.5 hover:shadow-ios-lg"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[12px] font-semibold text-ink-900">
                      {o.order_id}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-ink-400">
                      {formatDateID(o.created_at)} ·{" "}
                      {o.order_status.replace(/_/g, " ")}
                    </p>
                  </div>
                  <span className="font-display text-[15px] font-bold tabular-nums text-grass-700">
                    {formatIDR(o.total_payment)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
