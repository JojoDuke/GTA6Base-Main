"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/cms/auth";
import {
  ARTICLE_IMAGE_BUCKET,
  articleImageExtensions,
  getArticleImageUrl,
  MAX_ARTICLE_IMAGE_BYTES,
  MAX_ARTICLE_IMAGE_LABEL,
} from "@/lib/cms/images";
import { documentToPlainText, isRichDocument, parseArticleBody } from "@/lib/cms/rich-text";
import type { ArticleFormState, ArticleStatus } from "@/lib/cms/types";
import { articleFormSchema } from "@/lib/cms/validation";
import { createClient } from "@/lib/supabase/server";

function revalidatePublicContent(slug?: string | null) {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/news/[slug]", "page");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin", "layout");

  if (slug) {
    revalidatePath(`/news/${slug}`);
  }
}

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

function isRedirectError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string" &&
    error.digest.startsWith("NEXT_REDIRECT")
  );
}

export async function saveArticle(
  articleId: string | null,
  _previousState: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  try {
    return await saveArticleInner(articleId, formData);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error("saveArticle failed:", error);
    return {
      error:
        "Could not save the article. If you added an image, try a smaller JPEG or WebP.",
    };
  }
}

async function saveArticleInner(
  articleId: string | null,
  formData: FormData,
): Promise<ArticleFormState> {
  const user = await requireAdmin();
  const supabase = await createClient();
  const intent = String(formData.get("intent") ?? "");
  let existingImagePath: string | null = null;
  let existingSlug: string | null = null;

  if (articleId) {
    const { data: existingArticle, error } = await supabase
      .from("articles")
      .select("image_path, slug")
      .eq("id", articleId)
      .maybeSingle();

    if (error || !existingArticle) {
      return { error: "Could not find this article." };
    }

    existingImagePath = existingArticle.image_path;
    existingSlug = existingArticle.slug;
  }

  if (intent === "delete") {
    if (!articleId) {
      return { error: "This article has not been saved yet." };
    }

    const { error } = await supabase.from("articles").delete().eq("id", articleId);

    if (error) {
      return { error: "Could not delete the article. Please try again." };
    }

    if (existingImagePath) {
      await supabase.storage
        .from(ARTICLE_IMAGE_BUCKET)
        .remove([existingImagePath]);
    }

    revalidatePublicContent(existingSlug);
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
    imageAlt: formData.get("imageAlt"),
    imageCredit: formData.get("imageCredit"),
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
  const body = parseArticleBody(values.body);

  if (!body) {
    return {
      error: "Add article content.",
      fieldErrors: { body: ["Write at least one paragraph, heading, or image."] },
    };
  }

  const status = intent as ArticleStatus;
  const imageFile = formData.get("image");
  const hasNewImage = imageFile instanceof File && imageFile.size > 0;
  const removeImage = formData.get("removeImage") === "true";
  const willHaveImage =
    hasNewImage || (Boolean(existingImagePath) && !removeImage);

  if (willHaveImage && !values.imageAlt) {
    return {
      error: "Add alternative text for the featured image.",
      fieldErrors: {
        imageAlt: ["Describe the image for readers using screen readers."],
      },
    };
  }

  if (willHaveImage && !values.imageCredit) {
    return {
      error: "Add a copyright credit for the featured image.",
      fieldErrors: {
        imageCredit: ["Example: Image credit: Rockstar Games / Netflix"],
      },
    };
  }

  let nextImagePath = removeImage ? null : existingImagePath;
  let uploadedImagePath: string | null = null;

  if (hasNewImage) {
    const extension = articleImageExtensions[imageFile.type];

    if (!extension) {
      return {
        error: "Choose a supported image.",
        fieldErrors: {
          image: ["Use a JPEG, PNG, WebP, or AVIF image."],
        },
      };
    }

    if (imageFile.size > MAX_ARTICLE_IMAGE_BYTES) {
      return {
        error: "The selected image is too large.",
        fieldErrors: {
          image: [`Images must be ${MAX_ARTICLE_IMAGE_LABEL} or smaller.`],
        },
      };
    }

    uploadedImagePath = `${user.id}/${randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from(ARTICLE_IMAGE_BUCKET)
      .upload(uploadedImagePath, await imageFile.arrayBuffer(), {
        cacheControl: "31536000",
        contentType: imageFile.type,
        upsert: false,
      });

    if (uploadError) {
      return {
        error: "Could not upload the featured image.",
        fieldErrors: { image: [uploadError.message] },
      };
    }

    nextImagePath = uploadedImagePath;
  }

  const article = {
    title: values.title,
    slug: values.slug,
    excerpt: values.excerpt,
    category: values.category,
    tag: values.tag || null,
    body,
    image_path: nextImagePath,
    image_alt: nextImagePath ? values.imageAlt : "",
    image_credit: nextImagePath ? values.imageCredit : "",
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
    if (uploadedImagePath) {
      await supabase.storage
        .from(ARTICLE_IMAGE_BUCKET)
        .remove([uploadedImagePath]);
    }

    return databaseError(error.message);
  }

  if (
    existingImagePath &&
    existingImagePath !== nextImagePath
  ) {
    await supabase.storage
      .from(ARTICLE_IMAGE_BUCKET)
      .remove([existingImagePath]);
  }

  revalidatePublicContent(values.slug);

  if (existingSlug && existingSlug !== values.slug) {
    revalidatePath(`/news/${existingSlug}`);
  }

  redirect("/admin");
}

export async function uploadInlineImage(formData: FormData) {
  const user = await requireAdmin();
  const supabase = await createClient();
  const imageFile = formData.get("image");

  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return { ok: false as const, error: "Choose an image to insert." };
  }

  const extension = articleImageExtensions[imageFile.type];

  if (!extension) {
    return { ok: false as const, error: "Use a JPEG, PNG, WebP, or AVIF image." };
  }

  if (imageFile.size > MAX_ARTICLE_IMAGE_BYTES) {
    return {
      ok: false as const,
      error: `Images must be ${MAX_ARTICLE_IMAGE_LABEL} or smaller.`,
    };
  }

  const path = `${user.id}/inline/${randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from(ARTICLE_IMAGE_BUCKET)
    .upload(path, await imageFile.arrayBuffer(), {
      cacheControl: "31536000",
      contentType: imageFile.type,
      upsert: false,
    });

  if (error) {
    return { ok: false as const, error: "Could not upload the image." };
  }

  const url = getArticleImageUrl(path);

  if (!url) {
    return { ok: false as const, error: "Could not create the image URL." };
  }

  return { ok: true as const, url };
}

const EXCERPT_MAX_LENGTH = 320;

function bodyTextFromInput(raw: string) {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (isRichDocument(parsed)) {
      return documentToPlainText(parsed);
    }
  } catch {
    // Plain text fallback if the editor has not saved JSON yet.
  }

  return raw.trim();
}

export async function generateExcerpt(input: { title: string; body: string }) {
  await requireAdmin();

  const title = input.title.trim();
  const body = bodyTextFromInput(input.body);

  if (!title && !body) {
    return {
      ok: false as const,
      error: "Add a title or some article text first.",
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      ok: false as const,
      error: "Add OPENAI_API_KEY to generate excerpts.",
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 120,
        messages: [
          {
            role: "system",
            content:
              "You write short excerpts for GTA6Base, an unofficial Grand Theft Auto VI news site. Return only the excerpt. One or two sentences, no quotes, no preamble, max 320 characters.",
          },
          {
            role: "user",
            content: `Title: ${title || "(untitled)"}\n\nArticle:\n${body.slice(0, 4000) || "(no body yet)"}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return {
        ok: false as const,
        error: "Could not generate an excerpt. Try again.",
      };
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const excerpt = payload.choices?.[0]?.message?.content
      ?.trim()
      .replace(/^["']|["']$/g, "")
      .slice(0, EXCERPT_MAX_LENGTH);

    if (!excerpt) {
      return {
        ok: false as const,
        error: "The AI returned an empty excerpt.",
      };
    }

    return { ok: true as const, excerpt };
  } catch {
    return {
      ok: false as const,
      error: "Could not generate an excerpt. Try again.",
    };
  }
}
