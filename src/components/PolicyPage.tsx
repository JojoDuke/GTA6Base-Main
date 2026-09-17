import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function PolicyPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 lg:py-14">
      <Breadcrumbs items={[{ label: title }]} />
      <header className="border-b border-border pb-7">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          {description}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: September 17, 2026
        </p>
      </header>
      <div className="policy-content mt-8 space-y-8">{children}</div>
    </article>
  );
}
