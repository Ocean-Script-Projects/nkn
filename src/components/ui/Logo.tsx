export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-[family-name:var(--font-serif)] text-lg tracking-[0.14em]">
        NKN
      </span>
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-redSignature)]"
      />
    </div>
  );
}

