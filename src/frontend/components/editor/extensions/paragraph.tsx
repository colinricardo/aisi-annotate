import { cn } from "@frontend/lib/utils";
import { Extension } from "@tiptap/core";
import Paragraph from "@tiptap/extension-paragraph";

export const CustomParagraph = Paragraph.configure({
  HTMLAttributes: {
    class: cn("my-2 leading-normal text-base"),
  },
});

export const CustomEnterParagraph = Extension.create({
  name: "customEnterParagraph",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const isInBulletList = editor.isActive("bulletList");
        const isInOrderedList = editor.isActive("orderedList");

        if (isInBulletList || isInOrderedList) {
          return false;
        }

        // if we are not inside some other type of block, we can assume we are in a paragraph, and we can split it and not keep the styling
        return editor.commands.splitBlock({
          keepMarks: false,
        });
        return false;
      },
    };
  },
});
