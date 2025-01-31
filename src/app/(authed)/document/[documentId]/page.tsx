import { api } from "@backend/trpc";
import { PageEditor } from "@frontend/components/pages/page-editor";
import { PageError } from "@frontend/components/pages/page-error";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{
    documentId: string;
    organizationId: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = async (
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const params = await props.params;
  const { documentId } = params;
  const { document } = await api.public.getDocument({ documentId });

  return {
    title: document.title || "Untitled",
  };
};

export default async function Page(props: Props) {
  const params = await props.params;
  const { documentId } = params;

  const { document } = await api.document.get({ documentId });

  if (!document) {
    return (
      <PageError
        error={new Error("Document not found")}
        message="Document Not Found"
        subMessage="The document you're looking for doesn't exist or has been removed."
      />
    );
  }

  // note: all documents are public and editable!
  return <PageEditor document={document} />;
}
