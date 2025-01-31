"use client";

import { DocumentGrid } from "@frontend/components/documents/document-grid";
import { ContainerDocumentGrid } from "@frontend/components/layouts/home/container-document-grid";
import { ContainerPage } from "@frontend/components/layouts/home/container-page";
import { api } from "@frontend/trpc";
import { DocumentModel } from "@shared/types";

export const PageHome = ({
  initialDocuments,
}: {
  initialDocuments: DocumentModel[];
}) => {
  const {
    data: { documents },
    isLoading,
    refetch,
  } = api.document.getAll.useQuery(undefined, {
    initialData: { documents: initialDocuments },
  });

  return (
    <ContainerPage>
      <ContainerDocumentGrid>
        <DocumentGrid
          documents={documents}
          refetch={refetch}
          isLoading={isLoading}
        />
      </ContainerDocumentGrid>
    </ContainerPage>
  );
};
