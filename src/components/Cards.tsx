import Link from "next/link";
import type { Article, Entity } from "@/lib/data";

function MediaBlock({
  image,
  alt,
  className,
}: {
  image: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ backgroundImage: image }}
      role="img"
      aria-label={alt}
    />
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/${article.category === "Leak" ? "leaks" : "news"}/${article.slug}`}
      className="group flex min-h-[294px] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <MediaBlock
        image={article.image}
        alt={article.imageAlt}
        className="h-[148px] w-full shrink-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col gap-2 p-3 pt-3.5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="font-semibold text-primary">{article.category}</span>
          <span aria-hidden>·</span>
          <time>{article.date}</time>
        </div>
        <h3 className="text-[0.95rem] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

export function EntityCard({ entity }: { entity: Entity }) {
  const base =
    entity.type === "Character"
      ? "characters"
      : entity.type === "Vehicle"
        ? "vehicles"
        : "locations";

  return (
    <Link
      href={`/${base}/${entity.slug}`}
      className="group flex min-h-[294px] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <MediaBlock
        image={entity.image}
        alt={entity.name}
        className="h-[148px] w-full shrink-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col gap-2 p-3 pt-3.5">
        <span className="text-xs font-semibold text-primary">{entity.meta}</span>
        <h3 className="text-[0.95rem] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {entity.name}
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {entity.summary}
        </p>
      </div>
    </Link>
  );
}
