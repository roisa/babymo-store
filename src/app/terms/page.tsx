import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Syarat & ketentuan",
  description:
    "Ketentuan penggunaan situs Baby Mo, kebijakan pesanan, dan tanggung jawab kami sebagai penjual.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const updated = "26 Mei 2026";
  return (
    <ContentPage
      eyebrow="syarat & ketentuan"
      title="Aturan main, ditulis selembut mungkin."
      subtitle={`Diperbarui ${updated}.`}
    >
      <p>
        Dengan mengakses dan melakukan pesanan di {SITE_NAME}, kamu
        setuju dengan poin-poin di bawah. Kami coba tulis sesederhana
        mungkin — kalau ada yang kurang jelas, tanya kami langsung.
      </p>

      <h2>1. Tentang situs</h2>
      <p>
        {SITE_NAME} adalah toko online yang menjual produk lifestyle
        untuk keluarga di Indonesia. Situs ini, semua kontennya
        (ilustrasi, foto, copy), dan logo Baby Mo adalah milik kami.
      </p>

      <h2>2. Pesanan</h2>
      <ul>
        <li>
          Setiap pesanan yang kamu buat akan kami konfirmasi via
          WhatsApp sebelum diproses.
        </li>
        <li>
          Harga yang tercantum di situs sudah termasuk pajak (PPN
          Indonesia), tetapi <strong>belum termasuk ongkir</strong>.
          Ongkir dihitung saat konfirmasi.
        </li>
        <li>
          Kami berhak menolak atau membatalkan pesanan kalau ada
          indikasi spam, alamat tidak valid, atau stok mendadak habis.
          Kalau ini terjadi setelah kamu sudah bayar, kami refund
          penuh.
        </li>
      </ul>

      <h2>3. Pembayaran</h2>
      <ul>
        <li>
          Metode pembayaran: QRIS dan transfer bank dengan nominal
          unik. Nominal harus sama persis (mis. Rp89.237) supaya tim
          kami bisa mencocokkan pembayaran dengan cepat.
        </li>
        <li>
          Pesananmu hanya akan diproses setelah bukti pembayaran kamu
          upload dan tim kami verifikasi. Verifikasi biasanya selesai
          dalam beberapa jam di hari kerja.
        </li>
        <li>
          Bukti pembayaran palsu atau diedit akan membuat pesananmu
          dibatalkan dan akun kamu diblokir dari pembelian di masa
          depan.
        </li>
      </ul>

      <h2>4. Pengiriman</h2>
      <p>
        Detail estimasi waktu, ongkir, dan kebijakan pengembalian ada
        di halaman <a href="/shipping-info">Pengiriman &amp; Pengembalian</a>.
      </p>

      <h2>5. Produk digital</h2>
      <p>
        Lembar kerja, halaman mewarnai, dan tracing pages dikirim ke
        email kamu dalam beberapa menit setelah pembayaran terverifikasi.
        Kamu boleh mencetak berkali-kali untuk keluargamu sendiri, tapi
        <strong> tidak boleh menjual ulang atau membagikannya</strong>
        ke pihak lain.
      </p>

      <h2>6. Garansi &amp; tanggung jawab</h2>
      <p>
        Kami berkomitmen mengirim produk dalam kondisi baik. Bila produk
        rusak saat diterima, kami ganti sesuai kebijakan di halaman
        Pengiriman &amp; Pengembalian. Di luar itu, tanggung jawab kami
        terbatas pada nilai produk yang kamu beli.
      </p>

      <h2>7. Hak cipta &amp; kekayaan intelektual</h2>
      <p>
        Ilustrasi, foto produk, desain, dan teks di situs Baby Mo adalah
        milik kami. Boleh disimpan dan dibagikan untuk keperluan pribadi
        (mis. share ke teman via WhatsApp), tapi <strong>tidak boleh
        digunakan secara komersial</strong> tanpa izin tertulis dari
        kami.
      </p>

      <h2>8. Perubahan ketentuan</h2>
      <p>
        Kami boleh memperbarui halaman ini sewaktu-waktu. Versi terbaru
        akan dipasang di sini dengan tanggal "Diperbarui" di atas. Kalau
        kamu terus pakai situsnya setelah ada perubahan, artinya kamu
        setuju dengan versi yang baru.
      </p>

      <h2>9. Hukum yang berlaku</h2>
      <p>
        Ketentuan ini tunduk pada hukum Republik Indonesia. Setiap
        sengketa kami selesaikan secara musyawarah dulu — kalau benar-
        benar tidak menemui titik temu, melalui pengadilan negeri Jakarta.
      </p>

      <h2>10. Hubungi kami</h2>
      <p>
        Pertanyaan atau keluhan: <a href="https://wa.me/6282315971002">WhatsApp +62 823-1597-1002</a> atau{" "}
        <a href="mailto:hi@babymo.id">hi@babymo.id</a>.
      </p>

      <p className="text-[12px] italic text-ink-400">
        © {SITE_NAME}. Halaman ini bukan nasihat hukum.
      </p>
    </ContentPage>
  );
}
