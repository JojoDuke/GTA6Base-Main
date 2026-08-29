import "server-only";

import type { Article } from "@/lib/data";
import {
  getArticleBySlug as getStaticArticleBySlug,
  getNewsArticles as getStaticNewsArticles,
  latestNews,
} from "@/lib/data";
import { getArticleImageUrl } from "@/lib/cms/images";
import { normalizeArticleBody } from "@/lib/cms/rich-text";
import type { ArticleRow } from "@/lib/cms/types";
import { createPublicClient } from "@/lib/supabase/public";

const FALLBACK_IMAGE =
  "linear-gradient(135deg, #1a0a2e 0%, #7c3aed 50%, #ff2d6a 100%)";

function formatDate(value: string | null) {
  if (!value) return "Draft";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function sortDate(article: Article) {
  const timestamp = Date.parse(article.date);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function mapArticleRow(row: ArticleRow): Article {
  const imageUrl = getArticleImageUrl(row.image_path);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: formatDate(row.published_at),
    image: imageUrl ? `url("${imageUrl}")` : FALLBACK_IMAGE,
    imageAlt: row.image_alt || row.title,
    imageCredit: row.image_credit || undefined,
    tag: row.tag || undefined,
    body: normalizeArticleBody(row.body),
  };
}

async function getPublishedRows(): Promise<ArticleRow[]> {
  const supabase = createPublicClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Unable to load published articles:", error.message);
    return [];
  }

  return (data ?? []) as ArticleRow[];
}

function mergeBySlug(preferred: Article[], fallback: Article[]) {
  const bySlug = new Map<string, Article>();

  for (const article of fallback) {
    bySlug.set(article.slug, article);
  }

  for (const article of preferred) {
    bySlug.set(article.slug, article);
  }

  return [...bySlug.values()].sort((a, b) => sortDate(b) - sortDate(a));
}

export async function getPublishedArticles(): Promise<Article[]> {
  const rows = await getPublishedRows();
  return mergeBySlug(rows.map(mapArticleRow), getStaticNewsArticles());
}

export async function getHomeNews(heroCount = 3, gridCount = 4) {
  const articles = await getPublishedArticles();

  return {
    hero: articles.slice(0, heroCount),
    latest: articles.slice(heroCount, heroCount + gridCount),
  };
}

export async function getLatestArticles(limit = 4): Promise<Article[]> {
  const rows = await getPublishedRows();
  return mergeBySlug(rows.map(mapArticleRow), latestNews).slice(0, limit);
}

export async function getArticleBySlug(
  slug: string,
): Promise<Article | undefined> {
  const supabase = createPublicClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      return mapArticleRow(data as ArticleRow);
    }
  }

  return getStaticArticleBySlug(slug);
}

export async function getRelatedArticles(
  article: Article,
  limit = 3,
): Promise<Article[]> {
  const articles = await getPublishedArticles();
  return articles.filter((item) => item.slug !== article.slug).slice(0, limit);
}
