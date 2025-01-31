import type { AnnotationLabel } from "@shared/types";
import {
  getMarkRange,
  Mark,
  mergeAttributes,
  type CommandProps,
  type MarkConfig,
} from "@tiptap/core";
import type {
  Mark as ProseMirrorMark,
  Node as ProseMirrorNode,
} from "@tiptap/pm/model";
import { Plugin, TextSelection } from "@tiptap/pm/state";
import type { EditorView } from "@tiptap/pm/view";

// add to tiptap commands
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    annotation: {
      setAnnotation: (label: AnnotationLabel) => ReturnType;
      unsetAnnotation: () => ReturnType;
      toggleAnnotation: (label: AnnotationLabel) => ReturnType;
    };
  }
}

export const CustomAnnotation = Mark.create<MarkConfig>({
  name: "annotation",

  addOptions() {
    return {
      name: "annotation",
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      label: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-annotation-label"),
        renderHTML: (attributes) => {
          if (!attributes.label) return {};
          return {
            "data-annotation-label": attributes.label,
            class: `annotation-${attributes.label}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-annotation-label]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      ...this.parent?.(),

      // apply a single annotation to the entire current selection
      setAnnotation:
        (label: AnnotationLabel) =>
        ({ chain }: CommandProps) => {
          return chain()
            .unsetMark(this.name)
            .setMark(this.name, { label })
            .run();
        },

      // remove all of the annotation from the current selection
      unsetAnnotation:
        () =>
        ({ chain }: CommandProps) => {
          return chain().unsetMark(this.name).run();
        },

      // if any portion has this label, remove it from the entire label-region
      // otherwise, annotate the current selection
      toggleAnnotation:
        (label: AnnotationLabel) =>
        ({ state, dispatch, chain }: CommandProps) => {
          const { from, to } = state.selection;

          let foundLabel = false;
          let minPos = to;
          let maxPos = from;

          // walk all text nodes in selection
          state.doc.nodesBetween(from, to, (node: ProseMirrorNode, pos) => {
            if (!node.isText) return;
            const nodeStart = pos;
            // node.text?.length => # of characters in this text node
            const nodeEnd = pos + (node.text?.length ?? 0);

            node.marks.forEach((mark: ProseMirrorMark) => {
              if (mark.type.name === this.name && mark.attrs.label === label) {
                foundLabel = true;
                if (nodeStart < minPos) minPos = nodeStart;
                if (nodeEnd > maxPos) maxPos = nodeEnd;
              }
            });
          });

          if (!foundLabel) {
            // if not found just make a new annotation
            return chain()
              .unsetMark(this.name)
              .setMark(this.name, { label })
              .run();
          } else {
            // if found existing label, remove it from the entire region so we don't get partial leftover marks
            const tr = state.tr;

            // remove mark from [minPos, maxPos)
            // in prosemirror, removeMark "end" is exclusive,
            // so removing [minPos, maxPos] covers the entire text range
            tr.removeMark(minPos, maxPos, state.schema.marks.annotation);

            // validate that both positions point to text nodes before creating selection
            const $from = tr.doc.resolve(minPos);
            const $to = tr.doc.resolve(maxPos);

            if ($from.parent.isTextblock && $to.parent.isTextblock) {
              // ensure selection covers that region so the user sees the change
              tr.setSelection(TextSelection.create(tr.doc, minPos, maxPos));
              dispatch?.(tr.scrollIntoView());
            } else {
              // if positions aren't valid for text selection, just dispatch the mark removal
              dispatch?.(tr);
            }
            return true;
          }
        },
    };
  },

  // prosemirror plugin to ensure a single click on an annotation selects the full range of that annotation
  // this probably gets cursed if we do lots over overlapping annotations
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleClickOn: (
            view: EditorView,
            pos: number,
            node: unknown,
            nodePos: number,
            event: MouseEvent
          ) => {
            const target = event.target as HTMLElement;
            const annSpan = target.closest("span[data-annotation-label]");
            if (!annSpan) return false;

            const { state, dispatch } = view;
            // resolve click position
            let $pos = state.doc.resolve(pos);

            // find annotation mark at or to the left of pos
            let annotationMark = $pos
              .marks()
              .find((m) => m.type.name === this.name);
            if (!annotationMark && pos > 0) {
              // if we clicked just after the first char, check one char left
              $pos = state.doc.resolve(pos - 1);
              annotationMark = $pos
                .marks()
                .find((m) => m.type.name === this.name);
              if (!annotationMark) return false;
              pos--;
            }

            // still no mark? bail
            if (!annotationMark) return false;

            // get the entire range of that mark
            const range = getMarkRange(
              $pos,
              annotationMark.type,
              annotationMark.attrs
            );

            // if nothing found, bail
            if (!range) return false;

            // set selection to that full range
            const tr = state.tr.setSelection(
              TextSelection.create(state.doc, range.from, range.to)
            );
            dispatch(tr.scrollIntoView());
            return true;
          },
        },
      }),
    ];
  },
});
