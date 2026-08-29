import { z } from "zod";

export const EXCERPT_MAX_LENGTH = 150;

function isOneSentence(value: string) {
  return !/[.?!…]/.test(value.trim().replace(/[.?!…]+$/u, ""));
}

export function clipExcerpt(value: string) {
  const trimmed = value.trim().replace(/^["']|["']$/g, "");
  const firstSentence = trimmed.match(/^[^.?!…]+[.?!…]?/);
  return (firstSentence?.[0] ?? trimmed).trim().slice(0, EXCERPT_MAX_LENGTH);
}

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
  excerpt: z
    .string()
    .trim()
    .min(1, "Add an excerpt.")
    .max(EXCERPT_MAX_LENGTH, "Keep the excerpt to 150 characters.")
    .refine(isOneSentence, "Use one sentence only."),
  category: z.enum(["News", "Character", "Vehicle", "Location"]),
  tag: z.string().trim().max(60),
  body: z.string().min(1, "Add article content."),
  imageAlt: z.string().trim().max(180),
  imageCredit: z.string().trim().max(180),
  publishedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid publication date.")
    .or(z.literal("")),
});

