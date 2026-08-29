import "server-only";

import { requireAdmin } from "@/lib/cms/auth";
import type { ArticleRow } from "@/lib/cms/types";
import { createClient } from "@/lib/supabase/server";

export async function getAdminArticles(): Promise<ArticleRow[]> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Unable to load articles:", error.message);
    return [];
  }

  return [...((data ?? []) as ArticleRow[])].sort((left, right) => {
    const leftPublished =
      left.status === "published" && left.published_at
        ? Date.parse(left.published_at)
        : null;
    const rightPublished =
      right.status === "published" && right.published_at
        ? Date.parse(right.published_at)
        : null;

    if (leftPublished != null && rightPublished != null) {
      return rightPublished - leftPublished;
    }

    if (leftPublished != null || rightPublished != null) {
      return leftPublished != null ? 1 : -1;
    }

    return Date.parse(right.updated_at) - Date.parse(left.updated_at);
  });
}

export async function getAdminArticle(
  id: string,
): Promise<ArticleRow | undefined> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Unable to load the article:", error.message);
    return undefined;
  }

  return data as ArticleRow | undefined;
}
