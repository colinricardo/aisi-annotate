import TextStyle from "@tiptap/extension-text-style";

export const CustomTextStyle = TextStyle.configure({
  HTMLAttributes: {
    class: "text-style",
  },
});
