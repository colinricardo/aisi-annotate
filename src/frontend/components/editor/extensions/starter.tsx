import { StarterKit } from "@tiptap/starter-kit";

export const CustomStarterKit = StarterKit.configure({
  document: false,
  blockquote: false,
  heading: false,
  horizontalRule: false,
  bulletList: false,
  orderedList: false,
  gapcursor: false,
  history: false,
  paragraph: false,
  text: false,
  code: false,
  codeBlock: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
});
