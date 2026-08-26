import type { MetadataRoute } from "next";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
