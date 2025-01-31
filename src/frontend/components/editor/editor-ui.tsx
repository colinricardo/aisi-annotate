import { useEditor } from "@frontend/components/editor/editor-types";
import { FloatingToolbar } from "@frontend/components/editor/floating-toolbar";

import { AnnotationSelector } from "@frontend/components/editor/annotation/annotation-selector";
import { useEditorStore } from "@frontend/stores/editor-store";
import { AnnotationType, DocumentModel } from "@shared/types";
import { useEffect, useState } from "react";

export const EditorUI = ({
  document,
  annotationTypes,
}: {
  document: DocumentModel;
  annotationTypes: AnnotationType[];
}) => {
  const { editor } = useEditor();
  const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
  const [openAnnotationSelector, setOpenAnnotationSelector] = useState(false);
  const setEditorInstance = useEditorStore((state) => state.setEditorInstance);

  useEffect(() => {
    if (editor) setEditorInstance(editor);
  }, [editor, setEditorInstance]);

  if (!editor) return null;

  return (
    <>
      <FloatingToolbar
        aria-label="Floating toolbar"
        open={showFloatingToolbar}
        onOpenChange={setShowFloatingToolbar}
      >
        <AnnotationSelector
          aria-label="Annotation selector"
          open={openAnnotationSelector}
          onOpenChange={setOpenAnnotationSelector}
          annotationTypes={annotationTypes}
        />
      </FloatingToolbar>
    </>
  );
};
