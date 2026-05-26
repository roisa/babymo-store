"use client";

import Link from "next/link";
import Mascot from "@/components/Mascot";

export default function NotFound() {
  return (
    <div className="container-soft py-24 text-center">
      <div className="mx-auto mb-6 flex items-center justify-center">
        <Mascot size={140} alt="Baby Mo mascot" />
      </div>
      <h1 className="font-display text-[2rem] font-bold tracking-[-0.025em] text-ink-900 sm:text-[2.5rem]">
        Halaman ini tidak ditemukan.
      </h1>
      <p className="mt-3 text-[14px] text-ink-400">
        Mungkin ini cuma mimpi sejenak. Yuk cari sesuatu yang lembut lagi.
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
        <Link href="/" className="btn-soft">
          Beranda
        </Link>
        <Link href="/products" className="btn-primary">
          Lihat toko
        </Link>
      </div>
    </div>
  );
}
