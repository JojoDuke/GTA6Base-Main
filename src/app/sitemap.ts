import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/cms/queries";

const siteUrl = "https://gta6base.io";

const routes = [
  "/",
  "/news",
  "/characters",
  "/vehicles",
  "/locations",
  "/leaks",
  "/database",
  "/map",
  "/about",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const newsArticles = await getPublishedArticles();

  const staticEntries = routes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency:
      path === "/" ? ("daily" as const) : ("weekly" as const),
    priority: path === "/" ? 1 : 0.8,
  }));

  const newsEntries = newsArticles.map((article) => ({
    url: `${siteUrl}/news/${article.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...newsEntries];
}
