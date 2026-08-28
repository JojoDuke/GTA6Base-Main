"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  FileImage,
  FileText,
  Save,
  Send,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  generateExcerpt,
  saveArticle,
} from "@/app/admin/(protected)/articles/actions";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { getArticleImageUrl } from "@/lib/cms/images";
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
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [generatingExcerpt, setGeneratingExcerpt] = useState(false);
  const [excerptError, setExcerptError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    getArticleImageUrl(article?.image_path ?? null),
  );
  const [removeImage, setRemoveImage] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleGenerateExcerpt() {
    setGeneratingExcerpt(true);
    setExcerptError(null);

    const bodyField = formRef.current?.elements.namedItem("body");
    const body = bodyField instanceof HTMLInputElement ? bodyField.value : "";
    try {
      const result = await generateExcerpt({ title, body });

      if (!result.ok) {
        setExcerptError(result.error);
      } else {
        setExcerpt(result.excerpt);
      }
    } catch {
      setExcerptError("Could not generate an excerpt. Try again.");
    } finally {
      setGeneratingExcerpt(false);
    }
  }

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <form ref={formRef} action={formAction}>
      {state.error ? (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-accent/15 bg-accent/5 px-4 py-3 text-sm font-semibold text-accent"
        >
          {state.error}
        </div>
      ) : null}

      <input
        type="hidden"
        name="removeImage"
        value={removeImage ? "true" : "false"}
      />

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

              <div className="group">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                    Excerpt
                  </span>
                  <button
                    type="button"
                    onClick={handleGenerateExcerpt}
                    disabled={generatingExcerpt || pending}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary/10 hover:text-primary-hover disabled:cursor-wait disabled:opacity-60"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {generatingExcerpt ? "Generating…" : "Generate with AI"}
                  </button>
                </div>
                <textarea
                  name="excerpt"
                  value={excerpt}
                  onChange={(event) => setExcerpt(event.target.value)}
                  maxLength={320}
                  rows={3}
                  required
                  placeholder="A short summary for article cards and search results"
                  className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
                <FieldError
                  errors={
                    excerptError
                      ? [excerptError]
                      : state.fieldErrors?.excerpt
                  }
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FileImage className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-foreground">
                  Featured image
                </h2>
                <p className="text-xs text-muted-foreground">
                  JPEG, PNG, WebP, or AVIF up to 5 MB.
                </p>
              </div>
            </div>

            <input
              ref={imageInput}
              id="featured-image"
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                setSelectedImage(file);
                setRemoveImage(false);
                setImagePreview(file ? URL.createObjectURL(file) : null);
              }}
            />

            {imagePreview ? (
              <div className="mt-6">
                <div
                  role="img"
                  aria-label="Featured image preview"
                  className="group relative aspect-video overflow-hidden rounded-2xl bg-slate-100 bg-cover bg-center"
                  style={{ backgroundImage: `url("${imagePreview}")` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-80 transition-opacity group-hover:opacity-100" />
                  <button
                    type="button"
                    aria-label="Remove featured image"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                      setRemoveImage(true);
                      if (imageInput.current) imageInput.current.value = "";
                    }}
                    className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur transition-colors hover:bg-accent"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <label
                    htmlFor="featured-image"
                    className="absolute bottom-3 left-3 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-foreground transition-colors hover:bg-slate-100"
                  >
                    <Upload className="h-3.5 w-3.5 text-primary" />
                    Replace image
                  </label>
                  {selectedImage ? (
                    <span className="absolute bottom-4 right-3 max-w-[45%] truncate text-xs font-medium text-white/80">
                      {selectedImage.name}
                    </span>
                  ) : null}
                </div>
              </div>
            ) : (
              <label
                htmlFor="featured-image"
                className="group mt-6 flex aspect-[2.4/1] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-center transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm transition-colors group-hover:text-primary">
                  <Upload className="h-5 w-5" />
                </span>
                <span className="mt-3 text-sm font-bold text-foreground">
                  Choose an image
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  Click to browse your files
                </span>
              </label>
            )}
            <FieldError errors={state.fieldErrors?.image} />

            {imagePreview ? (
              <>
              <label className="group mt-5 block">
                <span className="text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                  Alternative text
                </span>
                <input
                  name="imageAlt"
                  defaultValue={article?.image_alt ?? ""}
                  maxLength={180}
                  required
                  placeholder="Describe what appears in the image"
                  className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Keep it concise and useful for screen-reader users.
                </p>
                <FieldError errors={state.fieldErrors?.imageAlt} />
              </label>
              <label className="group mt-5 block">
                <span className="text-sm font-semibold text-foreground transition-colors group-focus-within:text-primary">
                  Copyright credit
                </span>
                <input
                  name="imageCredit"
                  defaultValue={article?.image_credit ?? ""}
                  maxLength={180}
                  required
                  placeholder="Image credit: Rockstar Games / Netflix"
                  className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Shown under the image. Example: Source: Rockstar Games via YouTube
                </p>
                <FieldError errors={state.fieldErrors?.imageCredit} />
              </label>
              </>
            ) : (
              <>
                <input type="hidden" name="imageAlt" value="" />
                <input type="hidden" name="imageCredit" value="" />
              </>
            )}
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <FileText className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-foreground">Story body</h2>
                <p className="text-xs text-muted-foreground">
                  Headings, lists, links, and inline images.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <span className="sr-only">Article body</span>
              <RichTextEditor initialContent={article?.body} />
              <FieldError errors={state.fieldErrors?.body} />
            </div>
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
