import { cn } from "@frontend/lib/utils";
import { mergeAttributes } from "@tiptap/core";
import ListItem from "@tiptap/extension-list-item";

export const CustomListItem = ListItem.extend({
  name: "listItem",
  content: "paragraph block*",

  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        renderHTML: () => ({
          class: cn("my-1 leading-normal text-base"),
        }),
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "li",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});
