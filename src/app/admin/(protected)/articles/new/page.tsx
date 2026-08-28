import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/admin"
        className="group inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to articles
      </Link>

      <div className="mb-8 mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          New draft
        </p>
        <h1 className="mt-2 font-display text-5xl leading-none tracking-tight text-foreground sm:text-6xl">
          Create article
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Write now, then save it privately or publish it when ready.
        </p>
      </div>

      <ArticleForm />
    </main>
  );
}
