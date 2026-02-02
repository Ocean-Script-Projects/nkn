type Bucket = { count: number; resetAt: number };

// Extremely small in-memory limiter for MVP (works per-process).
// If we deploy serverless, this may reset between invocations — acceptable for MVP.
const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string, opts: { windowMs: number; limit: number }) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now >= b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true as const, remaining: opts.limit - 1, resetAt: now + opts.windowMs };
  }

  if (b.count >= opts.limit) {
    return { ok: false as const, remaining: 0, resetAt: b.resetAt };
  }

  b.count += 1;
  buckets.set(key, b);
  return { ok: true as const, remaining: Math.max(0, opts.limit - b.count), resetAt: b.resetAt };
}

