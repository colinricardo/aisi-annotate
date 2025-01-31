import TiptapUnderline from "@tiptap/extension-underline";

export const CustomUnderline = TiptapUnderline.configure({
  HTMLAttributes: {
    class: "underline",
  },
});
