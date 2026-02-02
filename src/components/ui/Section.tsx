import * as React from "react";

export function Section({
  id,
  kicker,
  title,
  children,
}: {
  id?: string;
  kicker?: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-18 md:py-24">
      <div className="mx-auto max-w-6xl">
        {kicker ? (
          <p className="text-[12px] tracking-[0.18em] text-[color:var(--color-brass)]">
            {kicker}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-5 font-[family-name:var(--font-serif)] text-3xl leading-[1.08] tracking-[-0.02em] md:text-5xl">
            {title}
          </h2>
        ) : null}
        <div className={title || kicker ? "mt-10" : undefined}>{children}</div>
      </div>
    </section>
  );
}

