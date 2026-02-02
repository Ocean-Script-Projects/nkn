"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WordReveal } from "@/components/ui/WordReveal";

const HeroClothScene = dynamic(
  () => import("./HeroClothScene").then((m) => m.HeroClothScene),
  { ssr: false }
);

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

function useWebglAvailable() {
  const [ok, setOk] = React.useState(true);
  React.useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl =
        c.getContext("webgl") || c.getContext("experimental-webgl");
      setOk(Boolean(gl));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

export function Hero({
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
  const reduced = usePrefersReducedMotion();
  const webgl = useWebglAvailable();
  const enable3d = webgl && !reduced;

  const ref = React.useRef<HTMLDivElement | null>(null);
  const [pointer, setPointer] = React.useState({ x: 0.72, y: 0.32 });
  const [wind, setWind] = React.useState(1);
  const [windOn, setWindOn] = React.useState(true);
  const [reel, setReel] = React.useState(false);

  React.useEffect(() => {
    setWind(windOn ? 1 : 0.2);
  }, [windOn]);

  // Reel choreography: 6s scripted motion for recording (stops on user interaction)
  React.useEffect(() => {
    if (!reel || !enable3d) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const s = Math.min(1, t / 6);

      // orbit-ish pointer path
      const a = t * 0.85;
      const px = 0.52 + Math.sin(a) * 0.26 + Math.sin(a * 2.2) * 0.06;
      const py = 0.52 + Math.cos(a * 0.9) * 0.22;
      setPointer({
        x: Math.max(0.08, Math.min(0.92, px)),
        y: Math.max(0.08, Math.min(0.92, py)),
      });

      // wind pulse
      const pulse = 0.65 + 0.45 * Math.sin(t * 1.6);
      setWind(0.25 + pulse * 1.2);

      if (s >= 1) {
        setReel(false);
        setWind(windOn ? 1 : 0.2);
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reel, enable3d]);

  return (
    <section className="relative overflow-hidden px-6 pb-10 pt-10 md:pb-14 md:pt-14">
      {/* Subtle ambient + grain (hero-only) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: enable3d
            ? `radial-gradient(46% 44% at ${pointer.x * 100}% ${pointer.y * 100}%, rgba(199,167,106,0.12), transparent 62%),
               radial-gradient(38% 32% at 22% 18%, rgba(0,0,0,0.03), transparent 60%),
               radial-gradient(44% 40% at 86% 16%, rgba(0,0,0,0.025), transparent 65%)`
            : "radial-gradient(60% 55% at 50% 30%, rgba(199,167,106,0.08), transparent 62%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage: "url(/placeholder/grain.svg)",
          backgroundSize: "240px 240px",
          animation: reduced ? undefined : "heroGrain 7.5s steps(10) infinite",
        }}
      />
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          {/* Left */}
          <div className="relative pt-1">
            <div aria-hidden className="pointer-events-none absolute -left-8 top-10 select-none">
              <div className="font-[family-name:var(--font-serif)] text-[150px] leading-none tracking-[-0.06em] text-black/[0.05] md:text-[210px]">
                NKN
              </div>
            </div>

            <Reveal>
              <div className="flex items-center gap-3">
                <p className="text-[12px] tracking-[0.28em] text-[color:var(--color-brass)]">
                  {kicker}
                </p>
                <span aria-hidden className="h-px flex-1 bg-[color:var(--border)]" />
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

            <Reveal delayMs={205}>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-[color:var(--border)] pt-5">
                {[
                  ["01", "Approach", "#approach"],
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
                <Button onClick={onPrimary} type="button">
                  {ctaPrimary}
                </Button>
                <Button variant="secondary" onClick={onSecondary} type="button">
                  {ctaSecondary}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right */}
          <Reveal delayMs={120}>
            <div
              ref={ref}
              className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 backdrop-blur-sm"
              onPointerMove={(e) => {
                if (!enable3d) return;
                if (reel) setReel(false);
                const el = ref.current;
                if (!el) return;
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width;
                const y = 1 - (e.clientY - r.top) / r.height;
                setPointer({
                  x: Math.max(0.06, Math.min(0.94, x)),
                  y: Math.max(0.06, Math.min(0.94, y)),
                });
              }}
              onPointerLeave={() => setPointer({ x: 0.72, y: 0.32 })}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-black/5">
                {/* Cloth halo behind */}
                {enable3d ? (
                  <HeroClothScene pointer={pointer} wind={wind} className="absolute inset-0" />
                ) : null}

                {/* Portrait front (always, even when WebGL off) */}
                <div className="absolute inset-0 p-5 sm:p-6">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/25 shadow-2xl shadow-black/15">
                    <Image
                      src="/placeholder/portrait-atelier.jpg"
                      alt="Portrait placeholder"
                      fill
                      className="object-cover"
                      priority
                      sizes="(min-width: 1024px) 520px, 100vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5" />
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4">
                  <p className="text-[11px] tracking-[0.22em] text-white/75">
                    {enable3d ? (reel ? "REEL MODE" : "MOVE / TAP") : "EDITORIAL"}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => enable3d && setReel(true)}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] tracking-[0.18em] text-white/80 backdrop-blur-sm hover:bg-white/15"
                      disabled={!enable3d}
                    >
                      REEL
                    </button>
                    <button
                      type="button"
                      onClick={() => setWindOn((v) => !v)}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] tracking-[0.18em] text-white/80 backdrop-blur-sm hover:bg-white/15"
                    >
                      {windOn ? "WIND" : "STILL"}
                    </button>
                  </div>
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

