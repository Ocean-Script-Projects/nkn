"use client";

import * as React from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function Manifesto({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: { title: string; body: string }[];
}) {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0)
          );
        const idx = visible[0]?.target
          ? els.indexOf(visible[0].target as HTMLDivElement)
          : -1;
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0.1, 0.2, 0.3] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} className="scroll-mt-24 px-6 py-18 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-14">
        <div className="md:sticky md:top-[96px] md:self-start">
          <p className="text-[12px] tracking-[0.18em] text-[color:var(--color-brass)]">
            NKN
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-serif)] text-3xl leading-[1.08] tracking-[-0.02em] md:text-5xl">
            {title}
          </h2>
          <div className="mt-10 overflow-hidden rounded-3xl border border-black/10 bg-black/5">
            <div className="relative aspect-[4/3]">
              <Image
                src="/placeholder/macro.svg"
                alt="Manifesto media placeholder"
                fill
                className="object-cover"
                unoptimized
                sizes="(min-width: 768px) 520px, 100vw"
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-2 h-[calc(100%-8px)] w-px bg-black/10" />
          <div
            className="absolute left-4 top-2 w-px bg-[color:var(--color-brass)] transition-[height] duration-300"
            style={{
              height: `${((active + 1) / items.length) * 100}%`,
            }}
          />
          <div className="space-y-12 pl-12">
            {items.map((item, idx) => (
              <div
                key={item.title}
                ref={(el) => {
                  refs.current[idx] = el;
                }}
                className={[
                  "relative transition-opacity",
                  idx === active ? "opacity-100" : "opacity-55",
                ].join(" ")}
              >
                <div
                  className={[
                    "absolute -left-[34px] top-2 h-2.5 w-2.5 rounded-full transition-colors",
                    idx === active
                      ? "bg-[color:var(--color-brass)]"
                      : "bg-black/20",
                  ].join(" ")}
                />
                <h3 className="font-[family-name:var(--font-serif)] text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Swatches() {
  const [open, setOpen] = React.useState<string | null>(null);

  const swatches = [
    { id: "forest", label: "Forest", hex: "#2D3B2E", body: "Grounded calm." },
    { id: "ochre", label: "Ochre", hex: "#9C7A3A", body: "Warm depth." },
    { id: "ivory", label: "Ivory", hex: "#F7F4EE", body: "Light, paper, air." },
    { id: "graphite", label: "Graphite", hex: "#1B1B1A", body: "Structure." },
    { id: "brass", label: "Brass", hex: "#C7A76A", body: "Quiet glow." },
  ];

  return (
    <Section kicker="NKN" title="Philosophy of color">
      <div className="relative rounded-3xl border border-black/10 bg-white/35 p-5 backdrop-blur-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          {swatches.map((s) => (
            <button
              key={s.id}
              type="button"
              className="relative h-14 flex-1 overflow-hidden rounded-2xl border border-black/10"
              style={{ backgroundColor: s.hex }}
              onMouseEnter={() => setOpen(s.id)}
              onMouseLeave={() => setOpen(null)}
              onClick={() => setOpen((v) => (v === s.id ? null : s.id))}
            >
              <span className="sr-only">{s.label}</span>
              {open === s.id ? (
                <span className="absolute inset-x-3 -bottom-14 z-10 rounded-2xl border border-black/10 bg-[color:rgba(247,244,238,0.95)] px-4 py-3 text-left text-xs text-black/70 shadow-lg shadow-black/10 sm:bottom-auto sm:top-16">
                  <span className="block text-[11px] tracking-[0.16em] text-black/55">
                    {s.label}
                  </span>
                  <span className="mt-1 block">{s.body}</span>
                </span>
              ) : null}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-black/65">
            Five tones define the palette. Red stays as a signature only.
          </p>
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-redSignature)]"
          />
        </div>
      </div>
    </Section>
  );
}

export function Upcycling({ id, title }: { id: string; title: string }) {
  const [pos, setPos] = React.useState(55);

  return (
    <Section id={id} kicker="NKN" title={title}>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-sm leading-7 text-black/70">
            Before/after slider placeholder. Once you have a case, we’ll replace
            images and copy with the real story.
          </p>
          <ol className="mt-8 space-y-4 text-sm text-black/70">
            <li>
              <span className="text-[11px] tracking-[0.16em] text-[color:var(--color-brass)]">
                01
              </span>{" "}
              Rethink form
            </li>
            <li>
              <span className="text-[11px] tracking-[0.16em] text-[color:var(--color-brass)]">
                02
              </span>{" "}
              Reconstruct
            </li>
            <li>
              <span className="text-[11px] tracking-[0.16em] text-[color:var(--color-brass)]">
                03
              </span>{" "}
              New function & energy
            </li>
          </ol>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white/35 p-4 backdrop-blur-sm">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/5">
            <Image
              src="/placeholder/piece.svg"
              alt="Before placeholder"
              fill
              className="object-cover"
              unoptimized
              sizes="(min-width: 768px) 520px, 100vw"
            />
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${pos}%` }}
            >
              <Image
                src="/placeholder/portrait.svg"
                alt="After placeholder"
                fill
                className="object-cover"
                unoptimized
                sizes="(min-width: 768px) 520px, 100vw"
              />
            </div>
            <div
              className="absolute inset-y-0"
              style={{ left: `calc(${pos}% - 1px)` }}
            >
              <div className="h-full w-0.5 bg-[color:var(--color-brass)]" />
              <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-[color:rgba(247,244,238,0.92)] shadow-lg shadow-black/10" />
            </div>
          </div>
          <input
            aria-label="Before/after"
            type="range"
            min={10}
            max={90}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="mt-4 w-full"
          />
        </div>
      </div>
    </Section>
  );
}

export function Prints({ id, title }: { id: string; title: string }) {
  return (
    <Section id={id} kicker="NKN" title={title}>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-black/5">
          <div className="relative aspect-[4/3]">
            <Image
              src="/placeholder/macro.svg"
              alt="Print placeholder"
              fill
              className="object-cover"
              unoptimized
              sizes="(min-width: 768px) 520px, 100vw"
            />
            <svg
              className="absolute inset-0"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="14"
                y1="26"
                x2="44"
                y2="36"
                stroke="rgba(199,167,106,0.9)"
                strokeWidth="0.6"
              />
              <line
                x1="86"
                y1="32"
                x2="60"
                y2="44"
                stroke="rgba(199,167,106,0.9)"
                strokeWidth="0.6"
              />
              <line
                x1="24"
                y1="78"
                x2="52"
                y2="62"
                stroke="rgba(199,167,106,0.9)"
                strokeWidth="0.6"
              />
            </svg>
          </div>
        </div>
        <div>
          <p className="text-sm leading-7 text-black/70">
            Print is part of structure. We’ll replace this with real examples of
            your textiles and a short explanation of the method.
          </p>
          <div className="mt-8 space-y-4 text-sm text-black/70">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--color-brass)]" />
              <div>
                <p className="text-[11px] tracking-[0.16em] text-black/55">
                  LAYER
                </p>
                <p>Placement that follows the cut.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--color-brass)]" />
              <div>
                <p className="text-[11px] tracking-[0.16em] text-black/55">
                  CONTRAST
                </p>
                <p>Quiet, precise accents.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--color-brass)]" />
              <div>
                <p className="text-[11px] tracking-[0.16em] text-black/55">
                  FINISH
                </p>
                <p>Handmade details, clean edges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function B2B({
  id,
  title,
  onRequest,
}: {
  id: string;
  title: string;
  onRequest: () => void;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-18 md:py-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[color:var(--color-graphite)] px-6 py-14 text-[color:var(--color-ivory)] md:px-12">
        <p className="text-[12px] tracking-[0.18em] text-[color:var(--color-brass)]">
          NKN
        </p>
        <h2 className="mt-5 font-[family-name:var(--font-serif)] text-3xl leading-[1.08] tracking-[-0.02em] md:text-5xl">
          {title}
        </h2>
        <div className="mt-10 grid gap-3 text-sm text-white/80 md:grid-cols-2">
          <div>silhouettes & construction</div>
          <div>patterns</div>
          <div>first sample</div>
          <div>production-ready support</div>
        </div>
        <div className="mt-10">
          <Button
            variant="secondary"
            className="h-11 border-white/20 text-white hover:bg-white/10"
            onClick={onRequest}
            type="button"
          >
            Discuss collaboration
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Events({
  id,
  title,
  onRequest,
}: {
  id: string;
  title: string;
  onRequest: () => void;
}) {
  return (
    <Section id={id} kicker="NKN" title={title}>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Atelier meetup", "A calm space to talk and see materials."],
          ["Consultation / fitting talk", "Discuss silhouette and fit."],
          ["Creative session", "For artists, designers, collaborations."],
        ].map(([name, body]) => (
          <div
            key={name}
            className="rounded-3xl border border-black/10 bg-white/40 p-6 backdrop-blur-sm"
          >
            <h3 className="font-[family-name:var(--font-serif)] text-2xl">
              {name}
            </h3>
            <p className="mt-3 text-sm leading-6 text-black/65">{body}</p>
            <div className="mt-7">
              <Button variant="secondary" className="h-11" onClick={onRequest} type="button">
                Apply
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
