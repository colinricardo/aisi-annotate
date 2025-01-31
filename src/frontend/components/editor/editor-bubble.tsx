import { useEditor } from "@frontend/components/editor/editor-types";
import { Slot } from "@radix-ui/react-slot";
import type { BubbleMenuProps, Editor } from "@tiptap/react";
import { BubbleMenu, isNodeSelection } from "@tiptap/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef, useEffect, useMemo, useRef } from "react";
import type { Instance, Props } from "tippy.js";

interface EditorBubbleItemProps {
  readonly children: ReactNode;
  readonly asChild?: boolean;
  readonly onSelect?: (editor: Editor) => void;
}

export const EditorBubbleItem = forwardRef<
  HTMLDivElement,
  EditorBubbleItemProps & Omit<ComponentPropsWithoutRef<"div">, "onSelect">
>(({ children, asChild, onSelect, ...rest }, ref) => {
  const { editor } = useEditor();
  const Comp = asChild ? Slot : "div";

  if (!editor) return null;

  return (
    <Comp ref={ref} {...rest} onClick={() => onSelect?.(editor)}>
      {children}
    </Comp>
  );
});

EditorBubbleItem.displayName = "EditorBubbleItem";

export interface EditorBubbleProps extends Omit<BubbleMenuProps, "editor"> {
  readonly children: ReactNode;
}

export const EditorBubble = forwardRef<HTMLDivElement, EditorBubbleProps>(
  ({ children, tippyOptions, ...rest }, ref) => {
    const { editor: currentEditor } = useEditor();
    const instanceRef = useRef<Instance<Props> | null>(null);

    useEffect(() => {
      if (!instanceRef.current || !tippyOptions?.placement) return;

      instanceRef.current.setProps({ placement: tippyOptions.placement });
      instanceRef.current.popperInstance?.update();
    }, [tippyOptions?.placement]);

    const bubbleMenuProps: Omit<BubbleMenuProps, "children"> = useMemo(
      () => ({
        editor: currentEditor,
        shouldShow: ({ editor, state }) => {
          const { selection } = state;
          const { empty } = selection;

          // don't show bubble menu if:
          // - the editor is not editable
          // - the selected node is an image
          // - the selection is empty
          // - the selection is a node selection (for drag handles)
          // - the selection is in a title block
          if (
            !editor.isEditable ||
            editor.isActive("image") ||
            empty ||
            isNodeSelection(selection) ||
            editor.isActive("title")
          ) {
            return false;
          }
          return true;
        },
        tippyOptions: {
          onCreate: (val) => {
            instanceRef.current = val;
          },
          moveTransition: "transform 0.15s ease-out",

          ...tippyOptions,
        },
        ...rest,
      }),
      [currentEditor, rest, tippyOptions]
    );

    if (!currentEditor) return null;

    return (
      // we need to add this because of https://github.com/ueberdosis/tiptap/issues/2658
      <div ref={ref}>
        {/* @ts-ignore */}
        <BubbleMenu editor={currentEditor} {...bubbleMenuProps}>
          {children}
        </BubbleMenu>
      </div>
    );
  }
);

EditorBubble.displayName = "EditorBubble";

export default EditorBubble;
