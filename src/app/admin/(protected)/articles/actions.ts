"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/cms/auth";
import type { ArticleFormState, ArticleStatus } from "@/lib/cms/types";
import {
  articleFormSchema,
  paragraphsFromText,
} from "@/lib/cms/validation";
import { createClient } from "@/lib/supabase/server";

function databaseError(message: string): ArticleFormState {
  if (message.includes("articles_slug_key")) {
    return { fieldErrors: { slug: ["That slug is already in use."] } };
  }

  if (message.includes("articles_featured_order_key")) {
    return {
      fieldErrors: {
        featuredOrder: ["That featured slot is already assigned."],
      },
    };
  }

  return { error: "Could not save the article. Please try again." };
}

export async function saveArticle(
  articleId: string | null,
  _previousState: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  await requireAdmin();
  const supabase = await createClient();
  const intent = String(formData.get("intent") ?? "");

  if (intent === "delete") {
    if (!articleId) {
      return { error: "This article has not been saved yet." };
    }

    const { error } = await supabase.from("articles").delete().eq("id", articleId);

    if (error) {
      return { error: "Could not delete the article. Please try again." };
    }

    revalidatePath("/admin", "layout");
    redirect("/admin");
  }

  if (intent !== "draft" && intent !== "published") {
    return { error: "Choose Save draft or Publish." };
  }

  const result = articleFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    category: formData.get("category"),
    tag: formData.get("tag"),
    body: formData.get("body"),
    publishedAt: formData.get("publishedAt"),
    featuredOrder: formData.get("featuredOrder"),
  });

  if (!result.success) {
    return {
      error: "Check the highlighted fields.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const values = result.data;
  const status = intent as ArticleStatus;
  const article = {
    title: values.title,
    slug: values.slug,
    excerpt: values.excerpt,
    category: values.category,
    tag: values.tag || null,
    body: paragraphsFromText(values.body),
    status,
    published_at: values.publishedAt
      ? `${values.publishedAt}T12:00:00.000Z`
      : status === "published"
        ? new Date().toISOString()
        : null,
    featured_order: values.featuredOrder
      ? Number(values.featuredOrder)
      : null,
  };

  const query = articleId
    ? supabase.from("articles").update(article).eq("id", articleId)
    : supabase.from("articles").insert(article);
  const { error } = await query;

  if (error) {
    return databaseError(error.message);
  }

  revalidatePath("/admin", "layout");
  redirect("/admin");
}
