export const ARTICLE_IMAGE_BUCKET = "article-images";
export const MAX_ARTICLE_IMAGE_BYTES = Math.floor(3.5 * 1024 * 1024);
export const MAX_ARTICLE_IMAGE_LABEL = "3.5 MB";

export const articleImageExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export function getArticleImageUrl(path: string | null) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!baseUrl || !path) return null;

  const encodedPath = path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `${baseUrl}/storage/v1/object/public/${ARTICLE_IMAGE_BUCKET}/${encodedPath}`;
}

export const DEFAULT_IMAGE_FOCUS = { x: 50, y: 0 };

export function clampImageFocus(value: unknown, fallback: number) {
  const number = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(number)) return fallback;

  return Math.min(100, Math.max(0, Math.round(number)));
}

export function imageFocusPosition(
  x?: number | null,
  y?: number | null,
) {
  return `${clampImageFocus(x, DEFAULT_IMAGE_FOCUS.x)}% ${clampImageFocus(y, DEFAULT_IMAGE_FOCUS.y)}%`;
}

export const DEFAULT_IMAGE_CREDIT = "Image credit: Rockstar Games";

export function formatImageCredit(credit?: string | null) {
  const trimmed = credit?.trim();

  if (!trimmed) return DEFAULT_IMAGE_CREDIT;

  if (/^(image credit|source|credit)\s*:/i.test(trimmed)) {
    return trimmed;
  }

  return `Image credit: ${trimmed}`;
}
