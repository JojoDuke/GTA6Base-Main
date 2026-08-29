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

  return (data ?? []) as ArticleRow[];
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
