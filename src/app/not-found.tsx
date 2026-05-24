import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-soft py-24 text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-pinky-100 text-4xl">
        🌷
      </div>
      <h1 className="font-display text-3xl text-ink-900 sm:text-4xl">
        This little corner doesn't exist.
      </h1>
      <p className="mt-2 text-sm text-ink-400">
        Maybe it was a quiet dream. Let's go find something soft instead.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn-soft">
          Go home
        </Link>
        <Link href="/products" className="btn-pink">
          Browse the shop
        </Link>
      </div>
    </div>
  );
}
