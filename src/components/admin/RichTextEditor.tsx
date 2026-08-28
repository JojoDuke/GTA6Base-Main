"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import {
  Bold,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Unlink,
} from "lucide-react";
import { uploadInlineImage } from "@/app/admin/(protected)/articles/actions";
import { richTextExtensions } from "@/lib/cms/rich-text-extensions";
import { normalizeBodyToDocument } from "@/lib/cms/rich-text";

function ToolbarButton({
  active,
  disabled,
  label,
  onClick,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors disabled:cursor-wait disabled:opacity-50 ${
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function normalizeHref(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function applyLink(editor: Editor, rawUrl: string) {
  const href = normalizeHref(rawUrl);

  if (!href) {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }

  if (editor.state.selection.empty) {
    editor
      .chain()
      .focus()
      .insertContent({
        type: "text",
        text: href.replace(/^https?:\/\//i, ""),
        marks: [{ type: "link", attrs: { href } }],
      })
      .run();
    return;
  }

  editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
}

function Toolbar({
  editor,
  uploading,
  onPickImage,
}: {
  editor: Editor;
  uploading: boolean;
  onPickImage: () => void;
}) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [url, setUrl] = useState("");
  const linkInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!linkOpen) return;
    linkInput.current?.focus();
    linkInput.current?.select();
  }, [linkOpen]);

  function openLinkForm() {
    setUrl(String(editor.getAttributes("link").href ?? ""));
    setLinkOpen(true);
  }

  function closeLinkForm() {
    setLinkOpen(false);
    editor.chain().focus().run();
  }

  function submitLink() {
    applyLink(editor, url);
    setLinkOpen(false);
  }

  return (
    <div className="border-b border-slate-200">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5">
      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-3.5 w-3.5" />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-slate-200" />
      <ToolbarButton
        label="Heading"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Subheading"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-3.5 w-3.5" />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-slate-200" />
      <ToolbarButton
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-3.5 w-3.5" />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-slate-200" />
      <ToolbarButton
        label="Link"
        active={editor.isActive("link") || linkOpen}
        onClick={openLinkForm}
      >
        <LinkIcon className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Insert image"
        disabled={uploading}
        onClick={onPickImage}
      >
        <ImageIcon className="h-3.5 w-3.5" />
      </ToolbarButton>
      </div>
      {linkOpen ? (
        <div className="flex items-center gap-2 border-t border-slate-100 bg-white px-2 py-2">
          <input
            ref={linkInput}
            type="text"
            inputMode="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                submitLink();
              }
              if (event.key === "Escape") {
                event.preventDefault();
                closeLinkForm();
              }
            }}
            placeholder="https://example.com"
            className="h-8 min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
          />
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={submitLink}
            className="h-8 cursor-pointer rounded-lg bg-primary px-3 text-xs font-bold text-white transition-colors hover:bg-primary-hover"
          >
            Apply
          </button>
          {editor.isActive("link") ? (
            <button
              type="button"
              aria-label="Remove link"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                editor.chain().focus().extendMarkRange("link").unsetLink().run();
                setLinkOpen(false);
              }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent"
            >
              <Unlink className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function RichTextEditor({
  name = "body",
  initialContent,
}: {
  name?: string;
  initialContent?: unknown;
}) {
  const document = normalizeBodyToDocument(initialContent);
  const [json, setJson] = useState(() => JSON.stringify(document));
  const [mounted, setMounted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: richTextExtensions,
    content: document,
    onUpdate: ({ editor: nextEditor }) => {
      setJson(JSON.stringify(nextEditor.getJSON()));
    },
    editorProps: {
      attributes: {
        class: "article-editor-content",
        "aria-label": "Article body",
      },
    },
  });

  const editorReady = mounted && Boolean(editor);

  async function handleImageSelected(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !editor) return;

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.set("image", file);

      const result = await uploadInlineImage(formData);

      if (!result.ok) {
        setUploadError(result.error);
        return;
      }

      editor.chain().focus().setImage({ src: result.url }).run();
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={json} />
      <input
        ref={imageInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="sr-only"
        onChange={handleImageSelected}
      />
      <div className="article-editor overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-colors hover:border-slate-300 focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10">
        {editorReady && editor ? (
          <Toolbar
            editor={editor}
            uploading={uploading}
            onPickImage={() => imageInput.current?.click()}
          />
        ) : (
          <div className="h-11 border-b border-slate-200" />
        )}
        {editorReady && editor ? (
          <EditorContent editor={editor} />
        ) : (
          <div className="min-h-[22rem] px-4 py-4 text-sm text-muted-foreground">
            Loading editor…
          </div>
        )}
      </div>
      {uploadError ? (
        <p className="mt-1.5 text-xs font-medium text-accent">{uploadError}</p>
      ) : null}
    </div>
  );
}
