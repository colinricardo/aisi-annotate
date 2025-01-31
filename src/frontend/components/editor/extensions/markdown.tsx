import { Markdown } from "tiptap-markdown";

export const CustomMarkdown = Markdown.configure({
  html: true,
  linkify: true,
  transformCopiedText: false,
  transformPastedText: true,
  breaks: true,
});
