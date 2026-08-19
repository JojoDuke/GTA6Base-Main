import Link from "next/link";

export function SectionHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span
          className="h-[18px] w-[3px] shrink-0 rounded-sm bg-primary sm:h-[29px]"
          aria-hidden
        />
        <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
      </div>
      {href ? (
        <Link
          href={href}
          className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          See all
        </Link>
      ) : null}
    </div>
  );
}
