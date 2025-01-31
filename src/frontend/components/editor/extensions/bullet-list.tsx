import { CustomListItem } from "@frontend/components/editor/extensions/list-item";
import { cn } from "@frontend/lib/utils";
import { Extension } from "@tiptap/core";
import TiptapBulletList from "@tiptap/extension-bullet-list";

import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

// this controls the overall list
// e.g. making this flex puts the items in a row
export const CustomBulletList = TiptapBulletList.extend({
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

export const CustomBulletListItem = CustomListItem.extend({
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
        key: new PluginKey("customBulletListItemPlaceholder"),
        props: {
          decorations: (state) => {
            const decorations: Decoration[] = [];
            const doc = state.doc;

            doc.descendants((node, pos) => {
              if (
                node.type.name === "bulletListItem" &&
                node.childCount === 1 &&
                node.firstChild?.textContent === ""
              ) {
                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: "is-empty",
                    "data-placeholder": "List",
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

export const CustomEnterBulletList = Extension.create({
  name: "customEnterBulletList",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        if (editor.isActive("bulletList")) {
          return editor.commands.splitListItem("listItem");
        }

        return false;
      },
    };
  },
});
