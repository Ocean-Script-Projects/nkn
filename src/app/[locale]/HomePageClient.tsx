"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { RequestModal } from "@/components/home/RequestModal";
import { Hero } from "@/components/home/Hero";
import {
  Manifesto,
  Upcycling,
  Prints,
  B2B,
  Events,
} from "@/components/home/sections/HomeClientSections";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePageClient() {
  const t = useTranslations("home");
  const [requestOpen, setRequestOpen] = React.useState(false);

  return (
    <main className="paper-grain min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader onRequest={() => setRequestOpen(true)} />

      <div className="pt-[88px] md:pt-[110px]">
        <Hero
          kicker={t("heroKicker")}
          title={t("heroTitle")}
          subtitle={t("heroSubtitle")}
          ctaPrimary={t("heroCtaPrimary")}
          ctaSecondary={t("heroCtaSecondary")}
          caption={t("heroCaption")}
          onPrimary={() => setRequestOpen(true)}
          onSecondary={() => {
            document
              .querySelector("#pieces")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />

        {/* Sticky Manifesto + client interactions below */}
        <Manifesto
          id="approach"
          title={t("approachTitle")}
          items={[
            {
              title: t("approachItems.oneTitle"),
              body: t("approachItems.oneBody"),
            },
            {
              title: t("approachItems.twoTitle"),
              body: t("approachItems.twoBody"),
            },
            {
              title: t("approachItems.threeTitle"),
              body: t("approachItems.threeBody"),
            },
            {
              title: t("approachItems.fourTitle"),
              body: t("approachItems.fourBody"),
            },
          ]}
        />

        <Section id="services" kicker="NKN" title={t("servicesTitle")}>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ["01", "Bespoke tailoring", "Precise fit, calm silhouette."],
              ["02", "One-of-one pieces", "Unique pieces with story."],
              ["03", "Mini series", "Small runs, atelier control."],
              ["04", "Upcycling", "New energy for beloved items."],
              ["05", "Custom prints", "Print as part of structure."],
              ["06", "Full cycle", "From idea to finish."],
              ["07", "For brands", "Patterns, samples, support."],
            ].map(([n, title, body]) => (
              <Reveal key={n} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs tracking-[0.18em] text-[color:var(--color-brass)]">
                        {n}
                      </p>
                      <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                        {body}
                      </p>
                    </div>
                    <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-black/5">
                      <Image
                        src="/placeholder/macro.svg"
                        alt="Macro placeholder"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        unoptimized
                        sizes="72px"
                      />
                    </div>
                  </div>
                  <div className="mt-7">
                    <Button
                      variant="secondary"
                      className="h-11"
                      onClick={() => setRequestOpen(true)}
                      type="button"
                    >
                      Request
                    </Button>
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[color:var(--color-brass)] opacity-[0.08]" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="pieces" kicker="NKN" title={t("piecesTitle")}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Corset", "one-of-one"],
              ["Dress", "atelier made"],
              ["Belt", "one-of-one"],
              ["Scarf", "atelier made"],
              ["Top", "one-of-one"],
              ["Jacket", "atelier made"],
            ].map(([name, tag]) => (
              <button
                key={name}
                type="button"
                onClick={() => setRequestOpen(true)}
                className="group overflow-hidden rounded-3xl border border-black/10 bg-white/40 text-left backdrop-blur-sm transition-colors hover:bg-white/55"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/placeholder/piece.svg"
                    alt="Piece placeholder"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    unoptimized
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-[family-name:var(--font-serif)] text-xl">
                      {name}
                    </h3>
                    <span className="text-[11px] tracking-[0.16em] text-[color:var(--color-brass)]">
                      {tag}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-black/65">Request this category</p>
                </div>
              </button>
            ))}
          </div>
        </Section>

        <Upcycling id="upcycling" title={t("upcyclingTitle")} />
        <Prints id="prints" title={t("printsTitle")} />
        <B2B id="b2b" title={t("b2bTitle")} onRequest={() => setRequestOpen(true)} />
        <Events
          id="events"
          title={t("eventsTitle")}
          onRequest={() => setRequestOpen(true)}
        />

        <Section id="request" kicker="NKN" title={t("requestTitle")}>
          <div className="grid gap-8 rounded-3xl border border-black/10 bg-white/40 p-6 backdrop-blur-sm md:grid-cols-2 md:p-10">
            <div>
              <h3 className="font-[family-name:var(--font-serif)] text-2xl leading-tight">
                A premium way to start
              </h3>
              <p className="mt-4 text-sm leading-6 text-black/65">
                Choose a direction, leave a contact, and we’ll reply within 24–48
                hours.
              </p>
            </div>
            <div className="flex items-center md:justify-end">
              <Button onClick={() => setRequestOpen(true)} type="button">
                Open request form
              </Button>
            </div>
          </div>
        </Section>

        <Section id="about" kicker="NKN" title="About">
          <div className="max-w-3xl text-sm leading-7 text-black/70">
            <p>
              Placeholder: short editorial bio. We’ll replace with the real story,
              city, and links once you provide them.
            </p>
          </div>
        </Section>

        <Section id="contact" kicker="NKN" title="Contact">
          <div className="max-w-3xl text-sm leading-7 text-black/70">
            <p>
              Placeholder: Telegram / Instagram / Email. For now, use the Request
              button to contact.
            </p>
          </div>
        </Section>

        <SiteFooter />
      </div>

      <RequestModal open={requestOpen} onClose={() => setRequestOpen(false)} />
    </main>
  );
}

