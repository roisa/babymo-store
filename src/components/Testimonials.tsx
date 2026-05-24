import { SectionHeader } from "./CategoryGrid";

const TESTIMONIALS = [
  {
    name: "Rana, 21",
    location: "Jakarta",
    text:
      "Bukunya cantik banget dan affirmation cardnya bener bener bikin tenang waktu hari berat 🥹",
    color: "bg-pinky-100",
  },
  {
    name: "Naomi, 26",
    location: "Bandung",
    text:
      "Packaging-nya bikin happy. Berasa unboxing hadiah dari diri sendiri ✨ love love love.",
    color: "bg-lavender-100",
  },
  {
    name: "Salwa, 19",
    location: "Surabaya",
    text:
      "Mood sticker pack-nya lucu banget, tempel di laptop bikin kerja jadi lebih lembut rasanya.",
    color: "bg-cream-100",
  },
  {
    name: "Kayla, 24",
    location: "Yogyakarta",
    text:
      "Worth every rupiah. Self care kitnya jadi ritual mingguan favorit aku sekarang.",
    color: "bg-beige-100",
  },
];

export default function Testimonials() {
  return (
    <section className="py-14">
      <div className="container-soft">
        <SectionHeader
          eyebrow="kind words"
          title="From people who needed a little softer day."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className={`rounded-3xl p-5 shadow-card ring-1 ring-ink-900/5 ${t.color}`}
            >
              <div className="flex gap-1 text-pinky-500">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-ink-900">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-4 text-xs text-ink-600">
                <span className="font-medium">{t.name}</span> · {t.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
