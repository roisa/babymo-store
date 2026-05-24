import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-cream-100/70 backdrop-blur">
      <div className="container-soft py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌷</span>
              <span className="font-display text-2xl text-ink-900">Baby Mo</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-600">
              Small comforts for your everyday moments. Designed in Indonesia,
              with so much love.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-ink-600">
              <li><Link href="/products" className="hover:text-ink-900">All products</Link></li>
              <li><Link href="/categories/emotional-journals" className="hover:text-ink-900">Journals</Link></li>
              <li><Link href="/categories/mood-stickers" className="hover:text-ink-900">Stickers</Link></li>
              <li><Link href="/categories/self-care-kits" className="hover:text-ink-900">Self-care kits</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
              Help
            </h4>
            <ul className="space-y-2 text-sm text-ink-600">
              <li><Link href="/#faq" className="hover:text-ink-900">FAQ</Link></li>
              <li><Link href="/#shipping" className="hover:text-ink-900">Shipping</Link></li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  className="hover:text-ink-900"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
              Stay soft
            </h4>
            <p className="text-sm text-ink-600">
              Follow @babymo.id for gentle drops and quiet announcements.
            </p>
            <div className="mt-3 flex gap-3">
              <a className="chip" href="https://instagram.com/babymo.id">Instagram</a>
              <a className="chip" href="https://tiktok.com/@babymo.id">TikTok</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-900/5 pt-6 text-xs text-ink-400 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Baby Mo. Made with care in Indonesia.</p>
          <p>Soft things for soft people. 🌷</p>
        </div>
      </div>
    </footer>
  );
}
