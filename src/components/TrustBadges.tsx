const BADGES = [
  { icon: "🌷", title: "Handpicked & curated", text: "every product, tested by our team" },
  { icon: "💌", title: "Care in every box", text: "wrapped softly, packed with love" },
  { icon: "📦", title: "Same-day packing", text: "before 3pm WIB on weekdays" },
  { icon: "💬", title: "WhatsApp support", text: "real humans, real warmth" },
];

export default function TrustBadges() {
  return (
    <section id="shipping" className="py-10">
      <div className="container-soft">
        <div className="grid grid-cols-2 gap-3 rounded-3xl bg-white/70 p-4 shadow-card ring-1 ring-ink-900/5 backdrop-blur sm:grid-cols-4 sm:p-6">
          {BADGES.map((b) => (
            <div key={b.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-warm-gradient text-lg">
                {b.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-ink-900">{b.title}</p>
                <p className="text-[11px] text-ink-400">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
