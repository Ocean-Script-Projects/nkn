"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WordReveal } from "@/components/ui/WordReveal";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function Magnetic({
  children,
  strength = 10,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [t, setT] = React.useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (reducedMotion) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        setT({
          x: Math.max(-strength, Math.min(strength, dx * 0.12)),
          y: Math.max(-strength, Math.min(strength, dy * 0.12)),
        });
      }}
      onPointerLeave={() => setT({ x: 0, y: 0 })}
      style={{
        transform: reducedMotion ? undefined : `translate3d(${t.x}px, ${t.y}px, 0)`,
        transition: reducedMotion
          ? undefined
          : "transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        display: "inline-flex",
      }}
    >
      {children}
    </div>
  );
}

export function HeroSpotlight({
  kicker,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  caption,
  onPrimary,
  onSecondary,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  caption: string;
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = React.useState({ x: 68, y: 34 }); // rendered %
  const target = React.useRef({ x: 68, y: 34 }); // target %
  const pointerActive = React.useRef(false);
  const [mode, setMode] = React.useState<"macro" | "piece">("macro");

  const onMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (reducedMotion) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      target.current = {
        x: Math.max(6, Math.min(94, x)),
        y: Math.max(6, Math.min(94, y)),
      };
    },
    [reducedMotion]
  );

  // Smooth spotlight motion + "breathing" idle animation (works on mobile too).
  React.useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;

      // If user isn't moving the pointer, drift slightly (quiet luxury "alive" feel).
      if (!pointerActive.current) {
        const driftX = Math.sin(t * 0.55) * 6;
        const driftY = Math.cos(t * 0.42) * 4;
        target.current = {
          x: Math.max(10, Math.min(90, 68 + driftX)),
          y: Math.max(10, Math.min(90, 34 + driftY)),
        };
      }

      // Spring-ish interpolation to avoid jitter.
      setPos((p) => {
        const dx = target.current.x - p.x;
        const dy = target.current.y - p.y;
        const next = { x: p.x + dx * 0.12, y: p.y + dy * 0.12 };
        // clamp for safety
        next.x = Math.max(6, Math.min(94, next.x));
        next.y = Math.max(6, Math.min(94, next.y));
        return next;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <section className="relative overflow-hidden px-6 pb-10 pt-10 md:pb-14 md:pt-14">
      {/* Ambient hero background (reacts to spotlight position) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: reducedMotion
            ? "radial-gradient(60% 55% at 50% 30%, rgba(199,167,106,0.10), transparent 62%)"
            : `radial-gradient(46% 44% at ${pos.x}% ${pos.y}%, rgba(199,167,106,0.12), transparent 62%),
               radial-gradient(40% 35% at 18% 12%, rgba(0,0,0,0.035), transparent 62%),
               radial-gradient(50% 45% at 82% 18%, rgba(0,0,0,0.03), transparent 65%)`,
          mixBlendMode: "multiply",
        }}
      />
      {/* Film grain (hero-only) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage: "url(/placeholder/grain.svg)",
          backgroundSize: "240px 240px",
          animation: reducedMotion ? undefined : "heroGrain 7.5s steps(10) infinite",
        }}
      />
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          {/* Text */}
          <div className="relative pt-1">
            {/* Editorial watermark (fills space, stays subtle) */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-4 top-10 select-none md:-left-8 md:top-12"
              style={{
                WebkitMaskImage: reducedMotion
                  ? undefined
                  : `radial-gradient(48% 42% at ${pos.x}% ${pos.y}%, black 0%, transparent 70%)`,
                maskImage: reducedMotion
                  ? undefined
                  : `radial-gradient(48% 42% at ${pos.x}% ${pos.y}%, black 0%, transparent 70%)`,
              }}
            >
              <div className="font-[family-name:var(--font-serif)] text-[110px] leading-none tracking-[-0.06em] text-black/[0.05] md:text-[170px]">
                NKN
              </div>
            </div>

            <Reveal>
              <div className="flex items-center gap-3">
                <p className="text-[12px] tracking-[0.28em] text-[color:var(--color-brass)]">
                  {kicker}
                </p>
                <span
                  aria-hidden
                  className="relative h-px flex-1 overflow-hidden bg-[color:var(--border)]"
                >
                  <span
                    className="absolute inset-0 origin-left bg-[color:var(--color-brass)]"
                    style={{
                      transform: reducedMotion ? "scaleX(1)" : "scaleX(0)",
                      animation: reducedMotion
                        ? undefined
                        : "lineDraw 900ms cubic-bezier(0.2,0.9,0.2,1) 120ms forwards",
                    }}
                  />
                </span>
              </div>
            </Reveal>

            <Reveal delayMs={90}>
              <h1 className="mt-6 font-[family-name:var(--font-serif)] text-5xl leading-[0.98] tracking-[-0.03em] md:text-7xl">
                <WordReveal text={title} />
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="mt-6 max-w-xl text-balance text-base leading-7 text-[color:var(--muted)]">
                {subtitle}
              </p>
            </Reveal>

            {/* Mini section index (editorial, clickable, not busy) */}
            <Reveal delayMs={205}>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-[color:var(--border)] pt-5">
                {[
                  ["01", "Manifesto", "#manifesto"],
                  ["02", "Pieces", "#pieces"],
                  ["03", "Request", "#request"],
                ].map(([n, label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="group inline-flex items-center gap-3 text-xs tracking-[0.18em] text-[color:var(--muted2)] hover:text-[color:var(--foreground)]"
                  >
                    <span className="text-[color:var(--color-brass)]">{n}</span>
                    <span>{label}</span>
                    <span className="h-px w-6 origin-left scale-x-0 bg-[color:var(--color-brass)] transition-transform duration-200 group-hover:scale-x-100" />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delayMs={230}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Magnetic strength={12}>
                  <Button onClick={onPrimary} type="button">
                    {ctaPrimary}
                  </Button>
                </Magnetic>
                <Magnetic strength={10}>
                  <Button variant="secondary" onClick={onSecondary} type="button">
                    {ctaSecondary}
                  </Button>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal delayMs={120}>
            <div
              ref={ref}
              className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 backdrop-blur-sm"
              onPointerMove={onMove}
              onPointerEnter={(e) => {
                // set initial position on enter so it feels responsive
                pointerActive.current = true;
                onMove(e);
              }}
              onPointerLeave={() => {
                pointerActive.current = false;
              }}
              onPointerDown={(e) => {
                pointerActive.current = true;
                onMove(e);
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-black/5">
                <Image
                  src="/placeholder/portrait.svg"
                  alt="Editorial portrait placeholder"
                  fill
                  priority
                  className={[
                    "object-cover transition-transform duration-700",
                    reducedMotion ? "" : "group-hover:scale-[1.02]",
                  ].join(" ")}
                  unoptimized
                  sizes="(min-width: 1024px) 560px, 100vw"
                />

                {/* Spotlight reveal layer */}
                <div
                  className="absolute inset-0"
                  style={{
                    WebkitMaskImage: reducedMotion
                      ? undefined
                      : `radial-gradient(140px 140px at ${pos.x}% ${pos.y}%, black 0%, black 42%, transparent 65%)`,
                    maskImage: reducedMotion
                      ? undefined
                      : `radial-gradient(140px 140px at ${pos.x}% ${pos.y}%, black 0%, black 42%, transparent 65%)`,
                  }}
                >
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder/macro.svg"
                      alt="Spotlight macro placeholder"
                      fill
                      className={[
                        "object-cover transition-opacity duration-500",
                        mode === "macro" ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                      unoptimized
                      sizes="(min-width: 1024px) 560px, 100vw"
                    />
                    <Image
                      src="/placeholder/piece.svg"
                      alt="Spotlight piece placeholder"
                      fill
                      className={[
                        "object-cover transition-opacity duration-500",
                        mode === "piece" ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                      unoptimized
                      sizes="(min-width: 1024px) 560px, 100vw"
                    />
                  </div>
                </div>

                {/* Subtle light/vignette linked to spotlight (premium depth, no clutter) */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: reducedMotion
                      ? "radial-gradient(60% 55% at 50% 35%, rgba(199,167,106,0.10), transparent 60%)"
                      : `radial-gradient(42% 38% at ${pos.x}% ${pos.y}%, rgba(199,167,106,0.18), transparent 62%),
                         radial-gradient(85% 75% at 50% 40%, rgba(0,0,0,0.10), transparent 70%)`,
                    mixBlendMode: "multiply",
                  }}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/14 via-transparent to-transparent" />

                {/* Hint + toggle */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4">
                  <p className="text-[11px] tracking-[0.22em] text-white/75">
                    MOVE / TAP
                  </p>
                  <button
                    type="button"
                    onClick={() => setMode((m) => (m === "macro" ? "piece" : "macro"))}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] tracking-[0.18em] text-white/80 backdrop-blur-sm hover:bg-white/15"
                  >
                    {mode === "macro" ? "MACRO" : "PIECE"}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs tracking-[0.22em] text-[color:var(--muted2)]">
                  {caption}
                </p>
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-[color:var(--color-redSignature)]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

