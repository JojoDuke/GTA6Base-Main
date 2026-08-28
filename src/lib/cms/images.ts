export const ARTICLE_IMAGE_BUCKET = "article-images";
export const MAX_ARTICLE_IMAGE_BYTES = 5 * 1024 * 1024;

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
