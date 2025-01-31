import { CustomListItem } from "@frontend/components/editor/extensions/list-item";
import { cn } from "@frontend/lib/utils";
import { Extension } from "@tiptap/core";
import TiptapOrderedList from "@tiptap/extension-ordered-list";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

export const CustomOrderedList = TiptapOrderedList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      itemTypeName: "listItem",
      HTMLAttributes: {
        class: cn("my-1 leading-normal text-base"),
      },
    };
  },
});

export const CustomOrderedListItem = CustomListItem.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: cn("my-1 leading-normal text-base"),
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("customOrderedListItemPlaceholder"),
        props: {
          decorations: (state) => {
            const decorations: Decoration[] = [];
            const doc = state.doc;

            doc.descendants((node, pos) => {
              if (
                node.type.name === "orderedListItem" &&
                node.childCount === 1 &&
                node.firstChild?.textContent === ""
              ) {
                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: "is-empty",
                    "data-placeholder": "List item",
                  })
                );
              }
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});

export const CustomEnterOrderedList = Extension.create({
  name: "customEnterOrderedList",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        if (editor.isActive("orderedList")) {
          return editor.commands.splitListItem("listItem");
        }

        return false;
      },
    };
  },
});
