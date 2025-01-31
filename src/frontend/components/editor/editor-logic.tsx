import {
  EditorContent,
  EditorRoot,
  useEditor,
} from "@frontend/components/editor/editor-types";
import { EditorUI } from "@frontend/components/editor/editor-ui";
import { CustomAnnotation } from "@frontend/components/editor/extensions/annotation";
import { defaultExtensions } from "@frontend/components/editor/extensions/extensions";
import { useEditorActions } from "@frontend/hooks/use-editor-actions";

import { useUpdateDocumentTitle } from "@frontend/lib/mutations";
import { useEditorStore } from "@frontend/stores/editor-store";
import { api } from "@frontend/trpc";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useSyncStatus } from "@liveblocks/react/suspense";
import { DocumentModel } from "@shared/types";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

export const EditorLogic = ({
  document,
  isViewOnly,
}: {
  document: DocumentModel;
  isViewOnly: boolean;
}) => {
  const liveblocks = useLiveblocksExtension({ comments: false });
  const { mutateAsync: updateTitle } = useUpdateDocumentTitle();

  const setBlockContext = useEditorStore((state) => state.setBlockContext);
  const setSurroundingContext = useEditorStore(
    (state) => state.setSurroundingContext
  );
  const setSelectedText = useEditorStore((state) => state.setSelectedText);
  const setRange = useEditorStore((state) => state.setRange);
  const { getBlockContext, getSurroundingContext } = useEditorActions();
  const { editor } = useEditor();

  const [currentTitle, setCurrentTitle] = useState("");
  const [currentSelection, setCurrentSelection] = useState<{
    from: number;
    to: number;
  } | null>(null);

  const { data } = api.document.getAnnotationTypes.useQuery();
  const annotationTypes = data?.annotationTypes ?? [];

  const handleTitleUpdate = useCallback(
    debounce(async ({ editor }: { editor: any }) => {
      if (!document) {
        return;
      }

      const titleNode = editor
        .getJSON()
        .content?.find((node: { type: string }) => node.type === "title");
      const newTitle = titleNode?.content?.[0]?.text ?? "";

      if (newTitle !== currentTitle) {
        setCurrentTitle(newTitle);
        await updateTitle({ documentId: document.id, title: newTitle });
      }
    }, 500),
    [document?.id, updateTitle, currentTitle]
  );

  const handleSelectionUpdate = useCallback(
    ({ editor }: { editor: any }) => {
      const { from, to } = editor.state.selection;
      setRange({ from, to });
      setCurrentSelection({ from, to });

      const selectedText =
        editor.state.doc.textBetween(from, to, " ").trim() || undefined;
      setSelectedText(selectedText);
    },
    [setRange, setSelectedText]
  );

  useEffect(() => {
    if (!editor || !currentSelection) return;

    const blockContext = getBlockContext();
    const surroundingContext = getSurroundingContext();

    setBlockContext(blockContext);
    setSurroundingContext(surroundingContext);
  }, [
    editor,
    currentSelection,
    getBlockContext,
    getSurroundingContext,
    setBlockContext,
    setSurroundingContext,
  ]);

  const extensions = [
    ...defaultExtensions,
    CustomAnnotation.configure({
      annotationTypes: annotationTypes.map((type) => type.id),
    }),
    liveblocks,
  ];

  const syncStatus = useSyncStatus({ smooth: true });

  return (
    <EditorRoot>
      <EditorContent
        aria-label="Editor"
        className="relative bg-background"
        extensions={extensions}
        immediatelyRender={false}
        onUpdate={handleTitleUpdate}
        onSelectionUpdate={handleSelectionUpdate}
        editable={!isViewOnly}
      >
        <EditorUI document={document} annotationTypes={annotationTypes ?? []} />
      </EditorContent>
    </EditorRoot>
  );
};
