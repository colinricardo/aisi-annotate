import { cn } from "@frontend/lib/utils";
import { mergeAttributes } from "@tiptap/core";
import Heading from "@tiptap/extension-heading";

export const CustomHeading = Heading.extend({
  levels: [1, 2, 3],
  renderHTML({ node, HTMLAttributes }) {
    const level = this.options.levels.includes(node.attrs.level)
      ? node.attrs.level
      : this.options.levels[0];
    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `heading-${level}`,
      }),
      0,
    ];
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        renderHTML: (attributes) => ({
          class: cn({
            "text-3xl font-bold mb-2 mt-6": attributes.level === 1,
            "text-2xl font-bold mb-2 mt-5": attributes.level === 2,
            "text-xl font-bold mb-2 mt-4": attributes.level === 3, 
          }),
        }),
      },
    };
  },
});
