"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const idx = Math.max(0, routing.locales.indexOf(locale));
  const segWidth = 44; // px

  return (
    <div className="relative h-10 rounded-full border border-[color:var(--border)] bg-white/40 px-1 backdrop-blur-sm">
      <div
        aria-hidden
        className="absolute left-1 top-1 h-8 rounded-full border border-black/10 bg-[color:rgba(247,244,238,0.92)] shadow-sm shadow-black/10 transition-transform duration-300"
        style={{ width: `${segWidth}px`, transform: `translateX(${idx * segWidth}px)` }}
      />

      <div className="relative flex h-full items-center text-[11px] tracking-[0.22em] text-[color:var(--muted2)]">
        {routing.locales.map((l) => (
          <Link
            key={l}
            href={pathname}
            locale={l}
            className={[
              "flex h-10 w-[44px] items-center justify-center transition-colors",
              l === locale ? "text-[color:var(--foreground)]" : "hover:text-[color:var(--foreground)]",
            ].join(" ")}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}

