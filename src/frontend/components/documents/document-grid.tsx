"use client";

import {
  DocumentCard,
  DocumentCardSkeleton,
  NewDocumentCard,
} from "@frontend/components/documents/document-card";

import { cn } from "@frontend/lib/utils";
import { useAppStore } from "@frontend/stores/app-store";
import { DocumentModel } from "@shared/types";

export const DocumentGridSkeleton = () => {
  const leftSidebarOpen = useAppStore((state) => state.leftSidebarOpen);

  return (
    <div className="p-4 max-h-[calc(3*180px+2*1rem)] overflow-y-auto">
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          leftSidebarOpen
            ? "md:grid-cols-1 lg:grid-cols-2"
            : "md:grid-cols-2 lg:grid-cols-3"
        )}
      >
        <NewDocumentCard />
        {Array.from({ length: 5 }).map((_, index) => (
          <DocumentCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export const DocumentGrid = ({
  showNewDocumentButton = true,
  documents,
  refetch,
  isLoading = false,
}: {
  showNewDocumentButton?: boolean;
  documents: DocumentModel[];
  refetch: () => void;
  isLoading?: boolean;
}) => {
  const leftSidebarOpen = useAppStore((state) => state.leftSidebarOpen);

  if (isLoading) {
    return <DocumentGridSkeleton />;
  }

  return (
    <div
      className="p-4 max-h-[calc(3*180px+2*1rem)] overflow-y-auto"
      tabIndex={-1}
    >
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          leftSidebarOpen
            ? "md:grid-cols-1 lg:grid-cols-2"
            : "md:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {showNewDocumentButton && <NewDocumentCard />}
        {documents.map((doc) => (
          <DocumentCard key={doc.id} {...doc} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};
