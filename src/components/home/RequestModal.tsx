"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";

type RequestKind =
  | "bespoke"
  | "upcycling"
  | "prints"
  | "catalog"
  | "collaboration";

const kinds: { id: RequestKind; label: string }[] = [
  { id: "bespoke", label: "Bespoke tailoring" },
  { id: "upcycling", label: "Upcycling" },
  { id: "prints", label: "Prints" },
  { id: "catalog", label: "Piece from catalog" },
  { id: "collaboration", label: "Collaboration" },
];

export function RequestModal({
  open,
  onClose,
  presetKind,
}: {
  open: boolean;
  onClose: () => void;
  presetKind?: RequestKind;
}) {
  const locale = useLocale();
  const [step, setStep] = React.useState<1 | 2>(1);
  const [kind, setKind] = React.useState<RequestKind>(presetKind ?? "bespoke");
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setStep(1);
    setSent(false);
    setSubmitting(false);
    setError(null);
    if (presetKind) setKind(presetKind);
  }, [open, presetKind]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center px-6"
    >
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div className="relative w-full max-w-xl rounded-3xl border border-black/10 bg-[color:rgba(247,244,238,0.96)] p-6 shadow-2xl shadow-black/10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[12px] tracking-[0.18em] text-[color:var(--color-brass)]">
              Concierge request
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl leading-tight">
              {sent ? "Thank you" : step === 1 ? "What do you need?" : "Details"}
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-full px-3 py-2 text-sm text-black/70 hover:bg-black/5"
          >
            Close
          </button>
        </div>

        {sent ? (
          <div className="mt-8 space-y-2 text-sm text-black/70">
            <p>Your request is ready to send to Telegram (will be wired next).</p>
            <p>Response time: 24–48 hours.</p>
            <div className="mt-6">
              <Button onClick={onClose} type="button">
                Done
              </Button>
            </div>
          </div>
        ) : step === 1 ? (
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              {kinds.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => setKind(k.id)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    k.id === kind
                      ? "border-black/20 bg-black/5 text-black"
                      : "border-black/10 bg-transparent text-black/70 hover:bg-black/5",
                  ].join(" ")}
                >
                  {k.label}
                </button>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-xs tracking-[0.16em] text-black/50">
                Step 1/2
              </span>
              <Button onClick={() => setStep(2)} type="button">
                Continue
              </Button>
            </div>
          </div>
        ) : (
          <form
            className="mt-8 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setSubmitting(true);
              setError(null);

              const form = e.currentTarget;
              const fd = new FormData(form);

              const payload = {
                kind: String(fd.get("kind") ?? "bespoke"),
                name: String(fd.get("name") ?? ""),
                contact: String(fd.get("contact") ?? ""),
                message: String(fd.get("message") ?? ""),
                company: String(fd.get("company") ?? ""),
                locale,
                pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
              };

              try {
                // For static export (GitHub Pages), use external API endpoint
                // Set NEXT_PUBLIC_API_URL environment variable or use default
                const apiUrl =
                  process.env.NEXT_PUBLIC_API_URL || "/api/request";
                
                const res = await fetch(apiUrl, {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(payload),
                });

                if (!res.ok) {
                  // If API is not available (static export), show alternative message
                  if (res.status === 404 || res.status === 0) {
                    setError(
                      "API endpoint not available. Please contact directly via Telegram or email."
                    );
                    setSubmitting(false);
                    return;
                  }
                  setError("Could not send. Please try again in a minute.");
                  setSubmitting(false);
                  return;
                }

                setSent(true);
              } catch (err) {
                // Network error or CORS issue - likely static export without API
                console.error("Request failed:", err);
                setError(
                  "API endpoint not available. Please contact directly via Telegram or email."
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs tracking-[0.16em] text-black/60">
                  Name
                </span>
                <input
                  className="h-11 w-full rounded-2xl border border-black/10 bg-white/70 px-4 text-sm outline-none focus:border-black/20"
                  name="name"
                  autoComplete="name"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs tracking-[0.16em] text-black/60">
                  Contact (Telegram/WhatsApp/Email)
                </span>
                <input
                  className="h-11 w-full rounded-2xl border border-black/10 bg-white/70 px-4 text-sm outline-none focus:border-black/20"
                  name="contact"
                  required
                />
              </label>
            </div>
            <label className="space-y-2">
              <span className="text-xs tracking-[0.16em] text-black/60">
                Message
              </span>
              <textarea
                className="min-h-28 w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:border-black/20"
                name="message"
              />
            </label>
            <input type="hidden" name="kind" value={kind} />
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            {error ? (
              <p className="text-sm text-red-700">{error}</p>
            ) : null}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-full px-3 py-2 text-sm text-black/70 hover:bg-black/5"
              >
                Back
              </button>
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-[0.16em] text-black/50">
                  Step 2/2
                </span>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Sending…" : "Send"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

