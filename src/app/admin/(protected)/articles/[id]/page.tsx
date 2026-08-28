import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { getAdminArticle } from "@/lib/cms/admin-queries";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getAdminArticle(id);

  if (!article) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin"
        className="group inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to articles
      </Link>

      <div className="mb-8 mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Edit article
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-5xl leading-none tracking-tight text-foreground sm:text-6xl">
            {article.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Changes remain private until you publish.
          </p>
        </div>
        <span
          className={
            article.status === "published"
              ? "w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700"
              : "w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700"
          }
        >
          {article.status}
        </span>
      </div>

      <ArticleForm article={article} />
    </main>
  );
}
