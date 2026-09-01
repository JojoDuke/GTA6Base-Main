import Link from "next/link";
import { ArticleCard } from "@/components/Cards";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { RichTextContent } from "@/components/RichTextContent";
import { formatImageCredit } from "@/lib/cms/images";
import type { Article } from "@/lib/data";
import { getRelatedArticles } from "@/lib/data";

export function ArticleDetail({
  article,
  related,
}: {
  article: Article;
  related?: Article[];
}) {
  const relatedArticles = related ?? getRelatedArticles(article);

  return (
    <article className="mx-auto max-w-[1450px] px-4 py-8 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[
            { href: "/news", label: "News" },
            { label: article.title },
          ]}
        />

        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            {article.category}
          </span>
          {article.tag ? (
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-foreground">
              {article.tag}
            </span>
          ) : null}
          <time>{article.date}</time>
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl">
        <div
          className="aspect-[16/9] overflow-hidden rounded-lg bg-cover bg-top"
          style={{ backgroundImage: article.image }}
          role="img"
          aria-label={article.imageAlt}
        />
        <p className="mt-2 text-center text-xs leading-5 text-muted-foreground">
          {formatImageCredit(article.imageCredit)}
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <RichTextContent body={article.body} />
      </div>

      <div className="mx-auto mt-10 max-w-3xl border-t border-border pt-6 text-sm text-muted-foreground">
        <p>
          Unofficial fan coverage on{" "}
          <Link href="/" className="font-semibold text-primary hover:text-primary-hover">
            GTA6Base
          </Link>
          . Not affiliated with Rockstar Games or Take-Two Interactive.
        </p>
        <p className="mt-2">
          <Link href="/news" className="hover:text-primary">
            ← Back to News
          </Link>
        </p>
      </div>

      {relatedArticles.length > 0 ? (
        <section className="mx-auto mt-14 max-w-[1450px]">
          <SectionHeader title="Related" href="/news" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
