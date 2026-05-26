/**
 * Tiny in-memory sliding-window rate limiter.
 *
 * Good enough as a first line of defence against simple POST flooding
 * on /api/orders. Note: state lives in the function instance — Vercel
 * may cold-start and reset it, so this is "best-effort" not "ironclad".
 *
 * For stronger guarantees later, swap the Map for an Upstash Redis
 * client (also free tier) — the function signature stays the same.
 */

type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();

export function clientIp(req: Request): string {
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/**
 * Check + record an attempt. Returns `{ ok: true }` to proceed, or
 * `{ ok: false, retryAfterSec }` to reject (use HTTP 429).
 */
export function rateLimit(
  key: string,
  opts: { max: number; windowMs: number },
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < opts.windowMs);

  if (bucket.hits.length >= opts.max) {
    const oldest = bucket.hits[0] ?? now;
    const retryAfterSec = Math.ceil(
      (opts.windowMs - (now - oldest)) / 1000,
    );
    buckets.set(key, bucket);
    return { ok: false, retryAfterSec: Math.max(1, retryAfterSec) };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  // Cheap GC: occasionally drop fully-expired buckets so the Map doesn't
  // grow unbounded in long-running instances.
  if (buckets.size > 1000 && Math.random() < 0.01) {
    for (const [k, b] of buckets) {
      if (b.hits.length === 0) buckets.delete(k);
    }
  }

  return { ok: true };
}
