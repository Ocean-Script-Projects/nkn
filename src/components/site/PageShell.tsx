import * as React from "react";

export function PageShell({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="paper-grain min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
        <h1 className="font-[family-name:var(--font-serif)] text-4xl leading-[1.05] tracking-[-0.02em] md:text-6xl">
          {title}
        </h1>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </main>
  );
}

