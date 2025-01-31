import { functionLogger } from "@backend/lib/logger";
import prisma from "@backend/prisma/client";
import { TRPCError } from "@trpc/server";

const getDocumentPublicById = functionLogger(
  async ({ documentId }: { documentId: string }) => {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      select: {
        id: true,
        title: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
        ownerId: true,
      },
    });

    if (!document) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Document not found",
      });
    }

    return {
      document: {
        id: document.id,
        title: document.title,
        isDeleted: document.isDeleted,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
        ownerId: document.ownerId,
      },
    };
  },
  "document.getPublicById.start",
  "document.getPublicById.success",
  "document.getPublicById.error"
);

const getAllDocuments = functionLogger(
  async () => {
    const documents = await prisma.document.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        title: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
        ownerId: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return {
      documents,
    };
  },
  "document.getAll.start",
  "document.getAll.success",
  "document.getAll.error"
);

// note: obviously irl we'd store/fetch these from the db
const getAnnotationTypes = functionLogger(
  async () => {
    return {
      annotationTypes: [
        { id: "person", label: "Person" },
        { id: "organization", label: "Organization" },
        { id: "location", label: "Location" },
        { id: "misc", label: "Miscellaneous" },
        { id: "doge", label: "Doge" },
      ],
    };
  },
  "document.getAnnotationTypes.start",
  "document.getAnnotationTypes.success",
  "document.getAnnotationTypes.error"
);

export default { getDocumentPublicById, getAllDocuments, getAnnotationTypes };
