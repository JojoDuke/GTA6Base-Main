import { z } from "zod";

export const articleFormSchema = z.object({
  title: z.string().trim().min(1, "Add a title.").max(180),
  slug: z
    .string()
    .trim()
    .min(1, "Add a slug.")
    .max(180)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and hyphens only.",
    ),
  excerpt: z.string().trim().min(1, "Add an excerpt.").max(320),
  category: z.enum(["News", "Character", "Vehicle", "Location"]),
  tag: z.string().trim().max(60),
  body: z.string().trim().min(1, "Add at least one paragraph."),
  publishedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid publication date.")
    .or(z.literal("")),
  featuredOrder: z.enum(["", "1", "2", "3"]),
});

export function paragraphsFromText(body: string) {
  return body
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
