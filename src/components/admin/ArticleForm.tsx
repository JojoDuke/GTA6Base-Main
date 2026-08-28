"use client";

import { useActionState, useState } from "react";
import { CalendarDays, FileText, Save, Send, Trash2 } from "lucide-react";
import { saveArticle } from "@/app/admin/(protected)/articles/actions";
import {
  initialArticleFormState,
  type ArticleRow,
} from "@/lib/cms/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;

  return (
    <p className="mt-1.5 text-xs font-medium text-accent">{errors[0]}</p>
  );
}

function dateInputValue(value?: string | null) {
  return value ? value.slice(0, 10) : new Date().toISOString().slice(0, 10);
}

export function ArticleForm({ article }: { article?: ArticleRow }) {
  const action = saveArticle.bind(null, article?.id ?? null);
  const [state, formAction, pending] = useActionState(
    action,
    initialArticleFormState,
  );
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(article));

  return (
    <form action={formAction}>
      {state.error ? (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-accent/15 bg-accent/5 px-4 py-3 text-sm font-semibold text-accent"
        >
          {state.error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-foreground">
                  Article details
                </h2>
                <p className="text-xs text-muted-foreground">
                  The headline and summary readers will see.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <label className="group block">
                <span className="text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                  Title
                </span>
                <input
                  name="title"
                  value={title}
                  onChange={(event) => {
                    const value = event.target.value;
                    setTitle(value);
                    if (!slugEdited) setSlug(slugify(value));
                  }}
                  maxLength={180}
                  required
                  placeholder="Enter a clear article headline"
                  className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
                <FieldError errors={state.fieldErrors?.title} />
              </label>

              <label className="group block">
                <span className="text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                  URL slug
                </span>
                <div className="mt-2 flex min-w-0 rounded-xl border border-slate-200 bg-slate-50 transition-colors hover:border-slate-300 focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10">
                  <span className="flex items-center border-r border-slate-200 px-3 text-xs text-muted-foreground">
                    /news/
                  </span>
                  <input
                    name="slug"
                    value={slug}
                    onChange={(event) => {
                      setSlug(slugify(event.target.value));
                      setSlugEdited(true);
                    }}
                    maxLength={180}
                    required
                    placeholder="article-url"
                    className="h-12 min-w-0 flex-1 bg-transparent px-3 font-mono text-sm outline-none"
                  />
                </div>
                <FieldError errors={state.fieldErrors?.slug} />
              </label>

              <label className="group block">
                <span className="text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                  Excerpt
                </span>
                <textarea
                  name="excerpt"
                  defaultValue={article?.excerpt ?? ""}
                  maxLength={320}
                  rows={3}
                  required
                  placeholder="A short summary for article cards and search results"
                  className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
                <FieldError errors={state.fieldErrors?.excerpt} />
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <FileText className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-foreground">Story body</h2>
                <p className="text-xs text-muted-foreground">
                  Separate paragraphs with a blank line.
                </p>
              </div>
            </div>

            <label className="mt-6 block">
              <span className="sr-only">Article body</span>
              <textarea
                name="body"
                defaultValue={article?.body.join("\n\n") ?? ""}
                rows={16}
                required
                placeholder={"Write your article here.\n\nStart a new paragraph after a blank line."}
                className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-[15px] leading-7 outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
              <FieldError errors={state.fieldErrors?.body} />
            </label>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold text-foreground">
                Publishing
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Category
                </span>
                <select
                  name="category"
                  defaultValue={article?.category ?? "News"}
                  className="mt-2 h-11 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition-colors hover:border-slate-300 hover:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  <option>News</option>
                  <option>Character</option>
                  <option>Vehicle</option>
                  <option>Location</option>
                </select>
                <FieldError errors={state.fieldErrors?.category} />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Tag
                </span>
                <input
                  name="tag"
                  defaultValue={article?.tag ?? ""}
                  maxLength={60}
                  placeholder="Optional"
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
                <FieldError errors={state.fieldErrors?.tag} />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Publication date
                </span>
                <input
                  type="date"
                  name="publishedAt"
                  defaultValue={dateInputValue(article?.published_at)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition-colors hover:border-slate-300 hover:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
                <FieldError errors={state.fieldErrors?.publishedAt} />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Featured slot
                </span>
                <select
                  name="featuredOrder"
                  defaultValue={article?.featured_order?.toString() ?? ""}
                  className="mt-2 h-11 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition-colors hover:border-slate-300 hover:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  <option value="">Not featured</option>
                  <option value="1">Slot 1</option>
                  <option value="2">Slot 2</option>
                  <option value="3">Slot 3</option>
                </select>
                <FieldError errors={state.fieldErrors?.featuredOrder} />
              </label>
            </div>
          </section>

          <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <button
              type="submit"
              name="intent"
              value="published"
              disabled={pending}
              className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-white transition-colors hover:bg-primary-hover disabled:cursor-wait disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {article?.status === "published" ? "Update" : "Publish"}
            </button>
            <button
              type="submit"
              name="intent"
              value="draft"
              disabled={pending}
              className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-foreground transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
            >
              <Save className="h-4 w-4 text-muted-foreground" />
              {article?.status === "published" ? "Unpublish" : "Save draft"}
            </button>

            {article ? (
              <button
                type="submit"
                name="intent"
                value="delete"
                disabled={pending}
                onClick={(event) => {
                  if (!window.confirm("Delete this article permanently?")) {
                    event.preventDefault();
                  }
                }}
                className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent/5 hover:text-accent disabled:cursor-wait disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" />
                Delete article
              </button>
            ) : null}
          </section>
        </aside>
      </div>
    </form>
  );
}
