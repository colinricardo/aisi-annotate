import { mergeAttributes, Node } from "@tiptap/core";

// todo: we previously had tag as "h1" but this was causing issues with the heading1 so idk (it broke copy/paste)
export const CustomTitle = Node.create({
  name: "title",
  priority: 1000,
  content: "inline*",
  parseHTML: () => [{ tag: "div" }],
  renderHTML: ({ HTMLAttributes }) => [
    "div",
    mergeAttributes(HTMLAttributes, {
      class: "title font-serif text-5xl text-secondary-foreground pb-4",
      style: "",
    }),
    0,
  ],
  addAttributes() {
    return {
      class: {
        default: "text-5xl font-bold mb-4 font-serif",
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => ({
          class: `title text-secondary-foreground font-serif ${
            attributes.class || ""
          }`.trim(),
        }),
      },
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-v": () => false,
      "Mod-V": () => false,
      "Shift-Enter": () => false,
    };
  },
});
