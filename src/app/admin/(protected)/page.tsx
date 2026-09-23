import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Plus,
  Radio,
} from "lucide-react";
import { getAdminArticles } from "@/lib/cms/admin-queries";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function AdminDashboardPage() {
  const articles = await getAdminArticles();
  const published = articles.filter(
    (article) => article.status === "published",
  ).length;
  const drafts = articles.length - published;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Editorial workspace
          </p>
          <h1 className="mt-2 font-display text-5xl leading-none tracking-tight text-foreground sm:text-6xl">
            Articles
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Publish in chronological order. The newest article leads the
            homepage.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-[0_8px_30px_rgb(46_163_255_/_0.35)] transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
        >
          <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
          New article
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "All articles",
            value: articles.length,
            icon: FileText,
            tone: "bg-primary/15 text-primary ring-primary/25",
            glow: "hover:border-primary/40",
          },
          {
            label: "Published",
            value: published,
            icon: Radio,
            tone: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
            glow: "hover:border-emerald-400/40",
          },
          {
            label: "Drafts",
            value: drafts,
            icon: CalendarDays,
            tone: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
            glow: "hover:border-amber-400/40",
          },
        ].map(({ label, value, icon: Icon, tone, glow }) => (
          <div
            key={label}
            className={`group rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors ${glow}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">
                {label}
              </p>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg ring-1 ${tone}`}
              >
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-4xl text-foreground">{value}</p>
          </div>
        ))}
      </div>

      <section className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <h2 className="text-sm font-bold text-foreground">Articles</h2>
          <p className="text-xs text-muted-foreground">
            Newest published first
          </p>
        </div>

        {articles.length ? (
          <div className="divide-y divide-border">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/admin/articles/${article.id}`}
                className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-hover sm:px-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground ring-1 ring-border transition-colors group-hover:bg-primary/15 group-hover:text-primary group-hover:ring-primary/30">
                  <FileText className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-bold text-foreground">
                      {article.title}
                    </h3>
                    <span
                      className={
                        article.status === "published"
                          ? "rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-400/20"
                          : "rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 ring-1 ring-amber-400/20"
                      }
                    >
                      {article.status}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    /news/{article.slug} ·{" "}
                    {article.status === "published" && article.published_at
                      ? `Published ${formatDate(article.published_at)}`
                      : `Updated ${formatDate(article.updated_at)}`}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground ring-1 ring-border">
              <FileText className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-sm font-bold text-foreground">
              No articles yet
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first draft to get started.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
