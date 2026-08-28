import type { JSONContent } from "@tiptap/core";
import type { ArticleBody } from "@/lib/data";

export const emptyDocument: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export function isRichDocument(value: unknown): value is JSONContent {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      (value as { type?: string }).type === "doc",
  );
}

export function paragraphsToDoc(paragraphs: string[]): JSONContent {
  const content = paragraphs
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((text) => ({
      type: "paragraph" as const,
      content: [{ type: "text" as const, text }],
    }));

  if (!content.length) {
    return emptyDocument;
  }

  return { type: "doc", content };
}

export function documentHasContent(doc: JSONContent): boolean {
  const visit = (node: JSONContent): boolean => {
    if (typeof node.text === "string" && node.text.trim()) {
      return true;
    }

    if (
      node.type === "image" &&
      typeof node.attrs?.src === "string" &&
      node.attrs.src.trim()
    ) {
      return true;
    }

    return Array.isArray(node.content) ? node.content.some(visit) : false;
  };

  return visit(doc);
}

export function normalizeBodyToDocument(body: unknown): JSONContent {
  if (isRichDocument(body)) {
    return body;
  }

  if (Array.isArray(body) && body.every((part) => typeof part === "string")) {
    return paragraphsToDoc(body);
  }

  return emptyDocument;
}

export function normalizeArticleBody(body: unknown): ArticleBody {
  if (isRichDocument(body)) {
    return body as ArticleBody;
  }

  if (Array.isArray(body) && body.every((part) => typeof part === "string")) {
    return body;
  }

  return [];
}

export function parseArticleBody(raw: string): JSONContent | null {
  try {
    const parsed = JSON.parse(raw) as unknown;

    if (!isRichDocument(parsed) || !documentHasContent(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function documentToPlainText(doc: JSONContent): string {
  const parts: string[] = [];

  const visit = (node: JSONContent) => {
    if (typeof node.text === "string") {
      parts.push(node.text);
    }

    node.content?.forEach(visit);

    if (node.type === "paragraph" || node.type === "heading") {
      parts.push("\n");
    }
  };

  visit(doc);
  return parts.join("").replace(/\n{3,}/g, "\n\n").trim();
}
