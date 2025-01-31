"use client";

import { EditorInstance } from "@frontend/components/editor/editor-types";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";

export const getBlockContext = ({
  editor,
}: {
  editor: EditorInstance;
}): string | undefined => {
  if (!editor) return undefined;
  const { from } = editor.state.selection;
  let blockText: string | undefined;

  // find the current block node
  editor.state.doc.nodesBetween(from, from, (node: ProseMirrorNode, pos) => {
    if (node.isBlock) {
      blockText = editor.state.doc.textBetween(pos, pos + node.nodeSize, " ");
      return false;
    }
    return true;
  });

  return blockText?.trim() || undefined;
};

export const getSurroundingContext = ({
  editor,
}: {
  editor: EditorInstance;
}): string | undefined => {
  if (!editor) return undefined;
  const { from } = editor.state.selection;
  let surroundingText = "";
  let blockCount = 0;
  let currentBlockFound = false;

  // find blocks around the current position
  editor.state.doc.nodesBetween(
    Math.max(0, from - 1000),
    Math.min(editor.state.doc.content.size, from + 1000),
    (node: ProseMirrorNode, pos) => {
      if (node.isBlock) {
        const blockText = editor.state.doc.textBetween(
          pos,
          pos + node.nodeSize,
          " "
        );

        if (pos <= from && pos + node.nodeSize >= from) {
          // this is the current block
          currentBlockFound = true;
          surroundingText += blockText + "\n";
          blockCount++;
        } else if (blockCount < 5) {
          // add surrounding blocks (up to 2 before and 2 after)
          if (!currentBlockFound) {
            // before current block
            surroundingText = blockText + "\n" + surroundingText;
          } else {
            // after current block
            surroundingText += blockText + "\n";
          }
          blockCount++;
        }
      }
      return true;
    }
  );

  return surroundingText.trim() || undefined;
};
