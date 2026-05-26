import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan privasi",
  description:
    "Bagaimana Baby Mo mengumpulkan, menggunakan, dan melindungi data pelangganmu.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const updated = "26 Mei 2026";
  return (
    <ContentPage
      eyebrow="kebijakan privasi"
      title="Datamu, dijaga dengan tenang."
      subtitle={`Diperbarui ${updated}.`}
    >
      <p>
        Kami sadar betul betapa berharganya datamu — apalagi datamu dan
        keluargamu. Halaman ini menjelaskan apa yang kami simpan, kenapa,
        dan apa hak kamu untuk meminta dihapus.
      </p>

      <h2>Data yang kami kumpulkan</h2>
      <ul>
        <li>
          <strong>Saat kamu checkout</strong>: nama, nomor WhatsApp,
          alamat lengkap, kota, kode pos, dan catatan pengiriman opsional
          yang kamu tulis sendiri.
        </li>
        <li>
          <strong>Saat kamu mengunggah bukti pembayaran</strong>: gambar
          bukti yang kamu pilih, disimpan terkait order ID kamu.
        </li>
        <li>
          <strong>Saat kamu menjelajah situs</strong>: data analitik
          anonim (halaman yang dilihat, jenis perangkat, kecepatan
          loading) via Vercel Analytics. Tidak ada cookie iklan pihak
          ketiga.
        </li>
        <li>
          <strong>Di perangkatmu</strong>: keranjang, daftar wishlist,
          dan pesanan terakhir disimpan di localStorage browser-mu agar
          tidak hilang saat refresh. Datanya tidak meninggalkan
          perangkatmu kecuali kamu melakukan checkout.
        </li>
      </ul>

      <h2>Cara kami menggunakannya</h2>
      <ul>
        <li>Memproses dan mengirimkan pesananmu.</li>
        <li>
          Mengkonfirmasi pembayaran, mengabari status pengiriman, dan
          membantu kamu via WhatsApp.
        </li>
        <li>
          Memahami halaman mana yang paling membantu (tanpa mengikuti
          kamu di luar situs Baby Mo).
        </li>
      </ul>

      <h2>Apa yang TIDAK kami lakukan</h2>
      <ul>
        <li>Kami tidak menjual datamu ke pihak ketiga.</li>
        <li>Kami tidak menggunakan datamu untuk iklan retargeting.</li>
        <li>
          Kami tidak mengirim newsletter, promosi, atau pesan otomatis
          tanpa izinmu — semua WhatsApp dari kami terkait pesanan saja.
        </li>
      </ul>

      <h2>Penyimpanan data</h2>
      <p>
        Data pesanan disimpan di server kami (Supabase) hingga 24 bulan
        untuk keperluan akuntansi dan dukungan pelanggan. Bukti
        pembayaran dihapus 12 bulan setelah pesanan selesai.
      </p>

      <h2>Pihak ketiga yang kami pakai</h2>
      <ul>
        <li>
          <strong>Vercel</strong> — hosting situs &amp; analytics. Tidak ada
          data pribadi yang dikirim, hanya data anonim halaman dan
          performa.
        </li>
        <li>
          <strong>Supabase</strong> — penyimpanan database pesanan dan
          bukti pembayaran.
        </li>
        <li>
          <strong>WhatsApp / Fonnte</strong> — untuk mengirimkan
          konfirmasi pesanan ke nomor WA yang kamu tulis.
        </li>
      </ul>

      <h2>Hak kamu</h2>
      <p>
        Kamu boleh meminta kami untuk:
      </p>
      <ul>
        <li>Mengirim ringkasan data pribadi yang kami simpan tentangmu.</li>
        <li>
          Memperbaiki data yang tidak akurat (mis. salah ketik alamat).
        </li>
        <li>
          Menghapus semua datamu (kecuali yang wajib disimpan untuk
          keperluan pajak, mis. invoice 5 tahun terakhir).
        </li>
      </ul>
      <p>
        Sapa kami di <a href="https://wa.me/6282315971002">WhatsApp</a>{" "}
        atau email <a href="mailto:hi@babymo.id">hi@babymo.id</a> untuk
        memprosesnya. Kami balas dalam 3 hari kerja.
      </p>

      <p className="text-[12px] italic text-ink-400">
        © {SITE_NAME}. Halaman ini bukan nasihat hukum — kalau ada
        pertanyaan spesifik, sapa kami langsung.
      </p>
    </ContentPage>
  );
}
