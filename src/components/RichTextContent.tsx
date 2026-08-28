import type { ReactNode } from "react";
import type { JSONContent } from "@tiptap/core";
import type { ArticleBody } from "@/lib/data";
import { isRichDocument } from "@/lib/cms/rich-text";

function isSafeUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const trimmed = value.trim();
  if (!trimmed) return false;

  try {
    const url = new URL(trimmed, "https://gta6base.local");
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function renderMarks(text: string, marks?: JSONContent["marks"]): ReactNode {
  return (marks ?? []).reduce<ReactNode>((node, mark) => {
    if (mark.type === "bold") return <strong>{node}</strong>;
    if (mark.type === "italic") return <em>{node}</em>;
    if (mark.type === "strike") return <s>{node}</s>;
    if (mark.type === "underline") return <u>{node}</u>;
    if (mark.type === "code") return <code>{node}</code>;
    if (mark.type === "link" && isSafeUrl(mark.attrs?.href)) {
      return (
        <a href={mark.attrs.href} rel="noopener noreferrer">
          {node}
        </a>
      );
    }

    return node;
  }, text);
}

function renderNodes(nodes: JSONContent[] | undefined): ReactNode {
  if (!nodes?.length) return null;

  return nodes.map((node, index) => {
    const children = renderNodes(node.content);

    switch (node.type) {
      case "paragraph":
        return <p key={index}>{children}</p>;
      case "heading": {
        const level = node.attrs?.level === 3 ? 3 : 2;
        const Tag = level === 3 ? "h3" : "h2";
        return <Tag key={index}>{children}</Tag>;
      }
      case "bulletList":
        return <ul key={index}>{children}</ul>;
      case "orderedList":
        return <ol key={index}>{children}</ol>;
      case "listItem":
        return <li key={index}>{children}</li>;
      case "blockquote":
        return <blockquote key={index}>{children}</blockquote>;
      case "codeBlock":
        return (
          <pre key={index}>
            <code>{children}</code>
          </pre>
        );
      case "horizontalRule":
        return <hr key={index} />;
      case "hardBreak":
        return <br key={index} />;
      case "image":
        if (!isSafeUrl(node.attrs?.src)) return null;
        return (
          <img
            key={index}
            src={node.attrs.src}
            alt={typeof node.attrs?.alt === "string" ? node.attrs.alt : ""}
            className="article-image"
          />
        );
      case "text":
        return (
          <span key={index}>
            {renderMarks(node.text ?? "", node.marks)}
          </span>
        );
      default:
        return children ? <div key={index}>{children}</div> : null;
    }
  });
}

export function RichTextContent({ body }: { body?: ArticleBody }) {
  if (!body) return null;

  if (Array.isArray(body)) {
    if (!body.length) return null;

    return (
      <div className="article-body">
        {body.map((paragraph, index) => (
          <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
        ))}
      </div>
    );
  }

  if (!isRichDocument(body)) return null;

  return <div className="article-body">{renderNodes(body.content)}</div>;
}
