function requiredEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function sendTelegramMessage(text: string) {
  const token = requiredEnv("TELEGRAM_BOT_TOKEN");
  const chatId = requiredEnv("TELEGRAM_CHAT_ID");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram send failed: ${res.status} ${body}`);
  }
}

export function formatTelegramHtml(parts: {
  kind: string;
  name: string;
  contact: string;
  message?: string;
  locale?: string;
  pageUrl?: string;
  ip?: string;
}) {
  const esc = (s: string) =>
    s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  const lines = [
    `<b>NKN Request</b>`,
    parts.locale ? `<b>Locale:</b> ${esc(parts.locale)}` : null,
    `<b>Kind:</b> ${esc(parts.kind)}`,
    `<b>Name:</b> ${esc(parts.name)}`,
    `<b>Contact:</b> ${esc(parts.contact)}`,
    parts.message?.trim() ? `<b>Message:</b> ${esc(parts.message.trim())}` : null,
    parts.pageUrl ? `<b>Page:</b> ${esc(parts.pageUrl)}` : null,
    parts.ip ? `<b>IP:</b> ${esc(parts.ip)}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

