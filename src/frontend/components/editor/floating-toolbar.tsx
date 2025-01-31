import { EditorBubble } from "@frontend/components/editor/editor-bubble";
import { useEditor } from "@frontend/components/editor/editor-types";
import { Fragment, type ReactNode } from "react";

export const FloatingToolbar = ({
  children,
  open,
  onOpenChange,
}: {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { editor } = useEditor();

  if (!editor) return null;

  return (
    <EditorBubble
      tippyOptions={{
        placement: "top",
        onHidden: () => {
          if (!editor) return;
          onOpenChange(false);
          editor.chain().unsetHighlight().run();
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-base  px-2 py-2 gap-2"
    >
      <Fragment>{children}</Fragment>
    </EditorBubble>
  );
};
