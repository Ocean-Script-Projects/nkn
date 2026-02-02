import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function SiteFooter() {
  const t = useTranslations("nav");

  return (
    <footer className="px-6 pb-14 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 backdrop-blur-sm md:grid-cols-2 md:p-10">
          <div>
            <p className="text-[12px] tracking-[0.22em] text-[color:var(--color-brass)]">
              NKN
            </p>
            <h3 className="mt-4 font-[family-name:var(--font-serif)] text-3xl leading-tight md:text-4xl">
              Ready to create something one-of-one?
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
              Concierge request goes directly to Telegram. Response time: 24–48
              hours.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#request">
                <Button type="button">Open request</Button>
              </a>
              <a href="#pieces">
                <Button variant="secondary" type="button">
                  View pieces
                </Button>
              </a>
            </div>
          </div>

          <div className="grid gap-8 md:justify-self-end">
            <div className="space-y-3">
              <Logo />
              <p className="text-sm leading-6 text-[color:var(--muted)]">
                Nature as support. Human as center. Structure & craft.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-[color:var(--muted)]">
              <a href="#services" className="hover:text-[color:var(--foreground)]">
                {t("services")}
              </a>
              <a href="#pieces" className="hover:text-[color:var(--foreground)]">
                {t("pieces")}
              </a>
              <a href="#upcycling" className="hover:text-[color:var(--foreground)]">
                {t("upcycling")}
              </a>
              <a href="#events" className="hover:text-[color:var(--foreground)]">
                {t("events")}
              </a>
              <a href="#about" className="hover:text-[color:var(--foreground)]">
                {t("about")}
              </a>
              <a href="#contact" className="hover:text-[color:var(--foreground)]">
                {t("contact")}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs tracking-[0.16em] text-[color:var(--muted2)]">
              <a href="#contact" className="hover:text-[color:var(--foreground)]">
                Instagram
              </a>
              <a href="#contact" className="hover:text-[color:var(--foreground)]">
                Telegram
              </a>
              <a href="#contact" className="hover:text-[color:var(--foreground)]">
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[color:var(--border)] pt-8 text-xs text-[color:var(--muted2)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} NKN Atelier. All rights reserved.</p>
          <p className="tracking-[0.14em]">Handmade · Precise · Editorial</p>
        </div>
      </div>
    </footer>
  );
}

