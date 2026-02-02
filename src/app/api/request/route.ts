import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rateLimit";
import { formatTelegramHtml, sendTelegramMessage } from "@/lib/telegram";

const RequestSchema = z.object({
  kind: z
    .enum(["bespoke", "upcycling", "prints", "catalog", "collaboration"])
    .default("bespoke"),
  name: z.string().min(2).max(80),
  contact: z.string().min(3).max(120),
  message: z.string().max(2000).optional().default(""),
  // Honeypot
  company: z.string().max(0).optional().default(""),
  // Optional context
  locale: z.string().max(10).optional(),
  pageUrl: z.string().max(400).optional(),
});

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const limit = checkRateLimit(`request:${ip}`, {
    windowMs: 60_000,
    limit: 5,
  });

  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 }
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const parsed = RequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload" },
      { status: 400 }
    );
  }

  // Honeypot hit => pretend success
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const text = formatTelegramHtml({
    kind: parsed.data.kind,
    name: parsed.data.name,
    contact: parsed.data.contact,
    message: parsed.data.message,
    locale: parsed.data.locale,
    pageUrl: parsed.data.pageUrl,
    ip,
  });

  try {
    await sendTelegramMessage(text);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "telegram_failed" },
      { status: 500 }
    );
  }
}

