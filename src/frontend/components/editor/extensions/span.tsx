import { Node } from "@tiptap/core";

export const CustomSpan = Node.create({
  name: "span",

  inline: true,
  group: "inline",
  content: "inline*",
  parseHTML() {
    return [
      {
        tag: "span[data-id]",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  },
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("data-id"),
        renderHTML: (attributes: Record<string, any>) => {
          if (!attributes.id) {
            return {};
          }
          return { "data-id": attributes.id };
        },
      },
    };
  },
});
