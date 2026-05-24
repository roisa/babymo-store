import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-soft pt-10 pb-14 sm:pt-16 sm:pb-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="animate-fade-in">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs text-ink-600 ring-1 ring-ink-900/5 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-pinky-400" />
              Now shipping across Indonesia
            </div>
            <h1 className="font-display text-4xl leading-[1.1] tracking-tight text-ink-900 sm:text-5xl md:text-6xl">
              Small comforts for your everyday moments.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-600">
              Baby Mo creates emotional journals, mood stickers, and cozy little
              things — designed to soften your days and hold your softest thoughts.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn-primary">
                Shop the collection
                <Arrow />
              </Link>
              <Link href="/#bestsellers" className="btn-soft">
                See bestsellers
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-5 text-xs text-ink-400">
              <Trust>🌷 12,000+ orders</Trust>
              <Trust>💌 4.9 average rating</Trust>
              <Trust>📦 Same-day packing</Trust>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-warm-gradient shadow-glow">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80')] bg-cover bg-center opacity-90 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-pinky-100/40 via-transparent to-lavender-100/30" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/85 p-4 backdrop-blur-xl shadow-soft">
                <p className="font-display text-lg text-ink-900 leading-snug">
                  "It feels like a hug, in journal form."
                </p>
                <p className="mt-1 text-xs text-ink-400">— Naya, 23, Bandung</p>
              </div>
            </div>

            <div className="absolute -left-4 top-10 hidden h-20 w-20 animate-float rounded-3xl bg-pinky-200 shadow-soft md:block" />
            <div
              className="absolute -right-3 bottom-24 hidden h-16 w-16 animate-float rounded-2xl bg-lavender-200 shadow-soft md:block"
              style={{ animationDelay: "1.5s" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust({ children }: { children: React.ReactNode }) {
  return <span className="whitespace-nowrap">{children}</span>;
}
function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
