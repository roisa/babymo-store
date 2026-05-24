"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-soft py-24 text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-grass-100 text-4xl ring-2 ring-grass-200">
        🌱
      </div>
      <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
        Halaman ini tidak ditemukan.
      </h1>
      <p className="mt-2 text-sm text-ink-400">
        Mungkin ini cuma mimpi sejenak. Yuk cari sesuatu yang lembut lagi.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn-soft">
          Beranda
        </Link>
        <Link href="/products" className="btn-orange">
          Lihat toko
        </Link>
      </div>
    </div>
  );
}
