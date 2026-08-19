import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-baseline gap-0.5 font-display text-[1.35rem] font-bold tracking-tight md:text-[1.55rem] ${className}`}
      aria-label="GTA6Base home"
    >
      <span className="text-foreground">GTA</span>
      <span className="text-primary">6</span>
      <span className="text-foreground">BASE</span>
    </Link>
  );
}
