import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) {
  const base =
    "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20";
  const styles: Record<ButtonVariant, string> = {
    primary:
      "bg-[color:var(--color-graphite)] text-[color:var(--color-ivory)] hover:bg-black/85",
    secondary:
      "border border-black/15 bg-transparent text-[color:var(--color-graphite)] hover:bg-black/5",
    ghost:
      "bg-transparent text-[color:var(--color-graphite)] hover:bg-black/5",
  };

  return (
    <button className={[base, styles[variant], className].join(" ")} {...props} />
  );
}

