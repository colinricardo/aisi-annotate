"use client";

import { LoadingSpinner } from "@frontend/components/common/loading-spinner";
import { EditorLogic } from "@frontend/components/editor/editor-logic";
import { useEditorStore } from "@frontend/stores/editor-store";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { DocumentModel } from "@shared/types";
import { useEffect } from "react";

export const PageEditor = ({ document }: { document: DocumentModel }) => {
  const setDocument = useEditorStore((state) => state.setDocument);

  useEffect(() => {
    setDocument(document);
  }, [document, setDocument]);

  const loadingFallback = (
    <div className="relative w-full h-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );

  return (
    <div className="w-full h-screen flex">
      <div className="h-screen w-full">
        <ClientSideSuspense fallback={loadingFallback}>
          <EditorLogic document={document} isViewOnly={false} />
        </ClientSideSuspense>
      </div>
    </div>
  );
};
