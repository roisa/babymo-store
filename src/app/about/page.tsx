import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import Mascot from "@/components/Mascot";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang kami",
  description:
    "Baby Mo dibuat untuk keluarga yang ingin tumbuh pelan-pelan — buku cerita anak, stiker doa, kaos katun organik, dan barang hangat yang dipilih dengan tenang.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow="tentang kami"
      title="Sesuatu yang lembut, dibuat dengan hati."
      subtitle={`${SITE_NAME} adalah toko kecil yang percaya bahwa hari-hari kecil layak diisi dengan hal-hal yang lembut.`}
    >
      <div className="not-prose -mt-2 mb-6 flex items-end justify-center">
        <Mascot size={220} alt="Baby Mo mascot" />
      </div>
      <p>
        Kami memulai Baby Mo karena ingin punya tempat berbelanja yang tidak
        terburu-buru — tempat orang tua bisa memilih buku cerita, kaos,
        boneka, atau stiker doa dengan tenang, tanpa banner berkedip atau
        notifikasi yang menggesa.
      </p>
      <p>
        Setiap produk yang kami simpan di rak dipilih sendiri oleh tim
        kami. Bukan karena tren, bukan karena algoritma — tapi karena kami
        sendiri ingin punya barangnya di rumah. Itu standar kami.
      </p>

      <h2>Apa yang kami percaya</h2>
      <ul>
        <li>
          <strong>Tumbuh pelan-pelan itu boleh.</strong> Anak-anak tidak
          perlu jadwal padat untuk berkembang dengan sehat.
        </li>
        <li>
          <strong>Kelembutan adalah kekuatan.</strong> Kami pilih bahan,
          warna, dan kata-kata yang menenangkan.
        </li>
        <li>
          <strong>Anak-anak ingat momen, bukan barang.</strong> Tapi
          barang yang dipilih dengan hati bisa jadi bagian dari momen itu.
        </li>
      </ul>

      <h2>Cara kami bekerja</h2>
      <p>
        Tim kami kecil, dan kami suka begitu. Pesanan dipacking sendiri
        oleh kami di hari yang sama (sebelum jam 15.00 WIB) dengan kertas
        pastel khas Baby Mo, dan setiap paket dikirim dengan satu kartu
        ucapan tulisan tangan.
      </p>
      <p>
        Kalau ada apa-apa, balasan kami di WhatsApp adalah manusia
        sungguhan. Bukan bot, bukan template — kami sendiri.
      </p>

      <h2>Hubungi kami</h2>
      <p>
        Sapa kami di Instagram <a href="https://www.instagram.com/babymo.official">@babymo.official</a>,{" "}
        TikTok <a href="https://www.tiktok.com/@babymo.official">@babymo.official</a>, atau{" "}
        <a href="https://wa.me/6282315971002">WhatsApp +62 823-1597-1002</a>.
        Kami senang dengar kabarmu 🌱
      </p>
    </ContentPage>
  );
}
