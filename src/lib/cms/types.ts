import type { ArticleBody } from "@/lib/data";

export type ArticleStatus = "draft" | "published";
export type ArticleCategory = "News" | "Character" | "Vehicle" | "Location";

export type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  tag: string | null;
  body: ArticleBody;
  image_path: string | null;
  image_alt: string;
  status: ArticleStatus;
  published_at: string | null;
  featured_order: number | null;
  created_at: string;
  updated_at: string;
};

export type ArticleFormState = {
  error?: string;
  fieldErrors?: Partial<
    Record<
      | "title"
      | "slug"
      | "excerpt"
      | "category"
      | "tag"
      | "body"
      | "image"
      | "imageAlt"
      | "publishedAt"
      | "featuredOrder",
      string[]
    >
  >;
};

export const initialArticleFormState: ArticleFormState = {};
