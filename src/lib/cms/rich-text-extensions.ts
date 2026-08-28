import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";

export const richTextExtensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    link: {
      openOnClick: false,
      enableClickSelection: true,
      autolink: true,
      defaultProtocol: "https",
      HTMLAttributes: {
        rel: "noopener noreferrer",
      },
    },
  }),
  Image.configure({
    allowBase64: false,
    HTMLAttributes: {
      class: "article-image",
    },
  }),
];
