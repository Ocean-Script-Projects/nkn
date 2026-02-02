"use client";

import * as React from "react";

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

export function WordReveal({
  text,
  className,
  wordDelayMs = 55,
}: {
  text: string;
  className?: string;
  wordDelayMs?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const words = React.useMemo(
    () => text.split(/\s+/).filter(Boolean),
    [text]
  );

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text} role="text">
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block opacity-0"
          style={{
            animation: "wordRise 650ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards",
            animationDelay: `${i * wordDelayMs}ms`,
          }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

