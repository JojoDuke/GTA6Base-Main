"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type { JSONContent } from "@tiptap/core";
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
  Maximize2,
  PictureInPicture2,
  Unlink,
} from "lucide-react";
import { uploadInlineImage } from "@/app/admin/(protected)/articles/actions";
import {
  MAX_ARTICLE_IMAGE_BYTES,
  MAX_ARTICLE_IMAGE_LABEL,
} from "@/lib/cms/images";
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
          ? "bg-primary/15 text-primary ring-1 ring-primary/25"
          : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
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
  poppedOut,
  onTogglePopout,
}: {
  editor: Editor;
  uploading: boolean;
  onPickImage: () => void;
  poppedOut: boolean;
  onTogglePopout: () => void;
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
    <div className="border-b border-border">
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
      <span className="mx-1 h-5 w-px bg-border" />
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
      <span className="mx-1 h-5 w-px bg-border" />
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
      <span className="mx-1 h-5 w-px bg-border" />
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
      <span className="flex-1" />
      <ToolbarButton
        label={
          poppedOut
            ? "Enlarge: put the editor back in the page"
            : "Pop the editor out into a floating window"
        }
        onClick={onTogglePopout}
      >
        {poppedOut ? (
          <Maximize2 className="h-3.5 w-3.5" />
        ) : (
          <PictureInPicture2 className="h-3.5 w-3.5" />
        )}
      </ToolbarButton>
      </div>
      {linkOpen ? (
        <div className="flex items-center gap-2 border-t border-border bg-card px-2 py-2">
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
            className="h-8 min-w-0 flex-1 rounded-lg border border-border bg-muted px-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/10"
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

function countBodyText(text: string) {
  const characters = text.length;
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;

  return { words, characters };
}

function formatCount(value: number, singular: string, plural: string) {
  return `${value.toLocaleString("en-US")} ${value === 1 ? singular : plural}`;
}

function toDocument(raw: string): JSONContent {
  try {
    return normalizeBodyToDocument(JSON.parse(raw));
  } catch {
    return normalizeBodyToDocument(undefined);
  }
}

type DocumentPictureInPicture = {
  requestWindow: (options: { width: number; height: number }) => Promise<Window>;
};

const POPOUT_SIZE = { width: 640, height: 780 };

// ProseMirror listens for selection changes on the window the editor was
// created in. Once the editor's DOM lives in another window (the floating
// editor), that listener has to follow it or arrow keys and clicks stop
// updating the editor's selection.
const boundDocuments = new WeakMap<Editor, Document>();

function syncEditorDocument(editor: Editor) {
  if (editor.isDestroyed) return;

  const view = editor.view;
  const current = view.dom.ownerDocument;
  const bound = boundDocuments.get(editor) ?? window.document;

  if (bound === current) return;

  const observer = (
    view as unknown as {
      domObserver: {
        onSelectionChange: EventListener;
        start: () => void;
        stop: () => void;
      };
    }
  ).domObserver;

  bound.removeEventListener("selectionchange", observer.onSelectionChange);
  observer.stop();
  observer.start();
  view.updateRoot();
  boundDocuments.set(editor, current);
}

function preparePopoutWindow(target: Window) {
  const source = window.document;

  source
    .querySelectorAll('link[rel="stylesheet"], style')
    .forEach((node) => target.document.head.appendChild(node.cloneNode(true)));
  target.document.documentElement.className = source.documentElement.className;
  target.document.title = "Story body · GTA6Base editor";
  target.document.body.style.margin = "0";
}

function EditorSurface({
  seed,
  poppedOut,
  onChange,
  onTogglePopout,
}: {
  seed: JSONContent;
  poppedOut: boolean;
  onChange: (json: string) => void;
  onTogglePopout: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: richTextExtensions,
    content: seed,
    onUpdate: ({ editor: nextEditor }) => {
      onChange(JSON.stringify(nextEditor.getJSON()));
    },
    editorProps: {
      attributes: {
        class: "article-editor-content",
        "aria-label": "Article body",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    syncEditorDocument(editor);
    if (poppedOut) editor.commands.focus("end");
  }, [editor, poppedOut]);

  const { words, characters } = countBodyText(
    editor?.getText({ blockSeparator: "\n" }) ?? "",
  );

  async function handleImageSelected(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !editor) return;

    if (file.size > MAX_ARTICLE_IMAGE_BYTES) {
      setUploadError(
        `Images must be ${MAX_ARTICLE_IMAGE_LABEL} or smaller.`,
      );
      return;
    }

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

  const boxClass = poppedOut
    ? "article-editor flex min-h-0 flex-1 flex-col overflow-hidden bg-card"
    : "article-editor overflow-hidden rounded-2xl border border-border bg-muted transition-colors hover:border-border-strong focus-within:border-primary focus-within:bg-card focus-within:ring-4 focus-within:ring-primary/10";

  return (
    <div className={poppedOut ? "flex h-full min-h-0 flex-1 flex-col" : undefined}>
      <input
        ref={imageInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="sr-only"
        onChange={handleImageSelected}
      />
      <div className={boxClass}>
        {editor ? (
          <Toolbar
            editor={editor}
            uploading={uploading}
            onPickImage={() => imageInput.current?.click()}
            poppedOut={poppedOut}
            onTogglePopout={onTogglePopout}
          />
        ) : (
          <div className="h-11 shrink-0 border-b border-border" />
        )}
        <div
          className={
            poppedOut
              ? "min-h-0 flex-1 overflow-y-auto [&>div]:min-h-full [&_.article-editor-content]:min-h-full"
              : undefined
          }
        >
          {editor ? (
            <EditorContent editor={editor} />
          ) : (
            <div className="min-h-[22rem] px-4 py-4 text-sm text-muted-foreground">
              Loading editor…
            </div>
          )}
        </div>
        <p className="shrink-0 border-t border-border px-3 py-1.5 text-left text-xs tabular-nums text-muted-foreground">
          {formatCount(words, "word", "words")} ·{" "}
          {formatCount(characters, "character", "characters")}
        </p>
      </div>
      {uploadError ? (
        <p className="mt-1.5 shrink-0 px-3 text-xs font-medium text-accent">
          {uploadError}
        </p>
      ) : null}
    </div>
  );
}

function PoppedOutNotice({ onReturn }: { onReturn: () => void }) {
  return (
    <div className="flex min-h-[16rem] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/[0.04] px-6 py-10 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/25">
        <PictureInPicture2 className="h-5 w-5" />
      </span>
      <p className="text-sm font-bold text-foreground">
        The editor is floating in its own window
      </p>
      <p className="max-w-sm text-xs leading-5 text-muted-foreground">
        Keep writing there while you research in other tabs or programs. It
        closes if this page or the browser closes.
      </p>
      <button
        type="button"
        onClick={onReturn}
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-[0_8px_30px_rgb(46_163_255_/_0.3)] transition-colors hover:bg-primary-hover"
      >
        <Maximize2 className="h-4 w-4" />
        Bring it back
      </button>
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
  const initialDocument = normalizeBodyToDocument(initialContent);
  const [json, setJson] = useState(() => JSON.stringify(initialDocument));
  const [seed, setSeed] = useState<JSONContent>(initialDocument);
  const [popoutWindow, setPopoutWindow] = useState<Window | null>(null);
  const [popoutTheme, setPopoutTheme] = useState("light");
  const [popoutError, setPopoutError] = useState<string | null>(null);
  const latestJson = useRef(json);
  const wrapper = useRef<HTMLDivElement>(null);

  function handleChange(next: string) {
    latestJson.current = next;
    setJson(next);
  }

  // Close the floating window with the page: covers navigation, saving, and
  // (for the pop-up fallback) closing the browser.
  useEffect(() => {
    if (!popoutWindow) return;

    const close = () => popoutWindow.close();
    window.addEventListener("pagehide", close);

    return () => {
      window.removeEventListener("pagehide", close);
      popoutWindow.close();
    };
  }, [popoutWindow]);

  // Keep the floating window in step with the light/dark toggle.
  useEffect(() => {
    if (!popoutWindow) return;

    const host = wrapper.current?.closest(".admin-theme");
    if (!host) return;

    const observer = new MutationObserver(() => {
      setPopoutTheme(host.getAttribute("data-theme") ?? "light");
    });
    observer.observe(host, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [popoutWindow]);

  function returnToPage() {
    setSeed(toDocument(latestJson.current));
    setPopoutWindow(null);
    window.focus();
  }

  async function popOut() {
    setPopoutError(null);

    const api = (
      window as unknown as { documentPictureInPicture?: DocumentPictureInPicture }
    ).documentPictureInPicture;

    let target: Window | null = null;

    if (api) {
      try {
        target = await api.requestWindow(POPOUT_SIZE);
      } catch {
        target = null;
      }
    }

    // Browsers without Picture-in-Picture for documents get a regular
    // pop-up window instead.
    target ??= window.open(
      "",
      "gta6base-editor",
      `popup=yes,width=${POPOUT_SIZE.width},height=${POPOUT_SIZE.height}`,
    );

    if (!target) {
      setPopoutError(
        "Your browser blocked the floating window. Allow pop-ups for this site and try again.",
      );
      return;
    }

    preparePopoutWindow(target);

    const opened = target;
    // Fires for the built-in "back to tab" button, the window's close button,
    // and returnToPage(): the editor always lands back in the page.
    opened.addEventListener("pagehide", () => {
      setSeed(toDocument(latestJson.current));
      setPopoutWindow((current) => (current === opened ? null : current));
    });

    setSeed(toDocument(latestJson.current));
    setPopoutTheme(
      wrapper.current?.closest(".admin-theme")?.getAttribute("data-theme") ??
        "light",
    );
    setPopoutWindow(opened);
  }

  return (
    <div ref={wrapper}>
      <input type="hidden" name={name} value={json} />
      {popoutWindow ? (
        <>
          <PoppedOutNotice onReturn={returnToPage} />
          {createPortal(
            <div
              className="admin-theme flex h-screen flex-col"
              data-theme={popoutTheme}
            >
              <EditorSurface
                key="popout"
                seed={seed}
                poppedOut
                onChange={handleChange}
                onTogglePopout={returnToPage}
              />
            </div>,
            popoutWindow.document.body,
          )}
        </>
      ) : (
        <EditorSurface
          key="inline"
          seed={seed}
          poppedOut={false}
          onChange={handleChange}
          onTogglePopout={popOut}
        />
      )}
      {popoutError ? (
        <p className="mt-1.5 text-xs font-medium text-accent">{popoutError}</p>
      ) : null}
    </div>
  );
}
