import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Pengiriman & Pengembalian",
  description:
    "Estimasi pengiriman, biaya ongkir, kebijakan packing, dan cara mengembalikan barang di Baby Mo.",
  alternates: { canonical: "/shipping-info" },
};

export default function ShippingPage() {
  return (
    <ContentPage
      eyebrow="pengiriman & pengembalian"
      title="Dikirim dengan tenang, sampai dengan hangat."
      subtitle="Detail lengkap tentang cara kami packing, kirim, dan menangani pengembalian."
    >
      <h2>Proses pengiriman</h2>
      <p>
        Pesanan yang sudah <strong>verified</strong> kami packing di hari
        kerja yang sama bila pembayaran masuk sebelum jam <strong>15.00 WIB</strong>,
        atau di hari kerja berikutnya. Hari Sabtu, Minggu, dan libur
        nasional tidak ada packing — tapi pesanan akan diurus pertama
        kali di hari kerja berikutnya.
      </p>

      <h2>Estimasi waktu sampai</h2>
      <ul>
        <li>
          <strong>Jakarta, Bandung, Tangerang, Bekasi</strong>: 1–3 hari
          kerja
        </li>
        <li>
          <strong>Pulau Jawa lainnya</strong>: 2–4 hari kerja
        </li>
        <li>
          <strong>Luar Jawa</strong>: 3–7 hari kerja
        </li>
      </ul>
      <p>
        Estimasi di atas berdasarkan kurir reguler. Untuk pengiriman
        kilat, sapa kami via WhatsApp sebelum checkout.
      </p>

      <h2>Biaya ongkir</h2>
      <p>
        Ongkir dihitung saat kami konfirmasi pesanan via WhatsApp — biaya
        tergantung berat paket dan jarak kota tujuan. Kami selalu pilih
        opsi termurah dari beberapa kurir, kecuali kamu minta opsi
        tertentu (JNE / J&amp;T / SiCepat / Anteraja).
      </p>

      <h2>Packing</h2>
      <p>
        Setiap paket dibungkus dengan kertas pastel khas Baby Mo dan
        kardus tebal. Produk yang rapuh (poster, mug, boneka) mendapat
        bubble wrap tambahan. Untuk hadiah, tambahkan catatan di kolom
        &ldquo;Catatan pengiriman&rdquo; saat checkout — kami sisipkan
        kartu ucapan tulisan tangan.
      </p>

      <h2>Pengembalian &amp; refund</h2>
      <h3>Barang rusak saat diterima</h3>
      <p>
        Hubungi kami via WhatsApp dalam <strong>2×24 jam</strong> setelah
        paket diterima. Sertakan foto dan video unboxing yang
        memperlihatkan kondisi paket sebelum dibuka. Kami akan kirim
        pengganti dengan kurir cepat tanpa biaya tambahan.
      </p>
      <h3>Salah kirim</h3>
      <p>
        Bila barang yang kami kirim tidak sesuai pesanan, kami akan
        menukar dengan barang yang benar. Biaya pengiriman pengembalian
        ditanggung Baby Mo.
      </p>
      <h3>Pertukaran ukuran (kaos)</h3>
      <p>
        Untuk kaos yang belum dipakai, dicuci, dan masih dalam kondisi
        original (dengan label terpasang), pertukaran ukuran bisa
        dilakukan dalam 7 hari. Biaya kirim pertama kali ditanggung
        customer; biaya kirim balasan ditanggung Baby Mo.
      </p>

      <h2>Produk digital</h2>
      <p>
        Lembar kerja, halaman mewarnai, dan tracing pages dikirim ke
        email kamu dalam beberapa menit setelah pembayaran terverifikasi
        — tidak ada pengembalian uang untuk produk digital yang sudah
        diunduh.
      </p>

      <h2>Butuh bantuan?</h2>
      <p>
        Sapa kami di <a href="https://wa.me/6282315971002">WhatsApp +62 823-1597-1002</a>.
        Kami selalu balas dengan hangat 🌱
      </p>
    </ContentPage>
  );
}
