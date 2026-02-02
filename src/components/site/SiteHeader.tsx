"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

const nav = [
  { key: "services", href: "#services" },
  { key: "pieces", href: "#pieces" },
  { key: "upcycling", href: "#upcycling" },
  { key: "events", href: "#events" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
];

export function SiteHeader({ onRequest }: { onRequest: () => void }) {
  const t = useTranslations("nav");
  const [isTop, setIsTop] = React.useState(true);

  React.useEffect(() => {
    const onScroll = () => setIsTop(window.scrollY < 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all",
        isTop
          ? "bg-transparent"
          : "backdrop-blur-xl bg-[color:rgba(247,244,238,0.72)] border-b border-[color:var(--border)]",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex max-w-6xl items-center justify-between px-6 transition-[height] duration-200",
          isTop ? "h-[72px]" : "h-[56px]",
        ].join(" ")}
      >
        <Link href="/" className="text-black">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="group relative text-[11px] tracking-[0.24em] text-[color:var(--muted2)] transition-colors hover:text-[color:var(--foreground)]"
            >
              {t(item.key)}
              <span className="pointer-events-none absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--color-brass)] transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LanguageSwitcher />
          <Button
            variant="secondary"
            className="hidden h-11 px-5 md:inline-flex"
            onClick={onRequest}
            type="button"
          >
            {t("request")}
          </Button>
        </div>
      </div>
    </header>
  );
}

