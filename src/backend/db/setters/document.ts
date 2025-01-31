import { functionLogger } from "@backend/lib/logger";
import prisma from "@backend/prisma/client";
import { getUnixTimestamp } from "@shared/utils/general";
import { IdPrefix, randomId } from "@shared/utils/ids";

const createDocument = functionLogger(
  async ({ title, userId }: { title: string; userId: string }) => {
    const documentId = randomId({
      prefix: IdPrefix.Document,
    });

    const timestamp = getUnixTimestamp();

    const document = await prisma.document.create({
      data: {
        id: documentId,
        title,
        ownerId: userId,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    });

    return { document };
  },
  "document.create.start",
  "document.create.success",
  "document.create.error"
);

const softDeleteDocument = functionLogger(
  async ({ documentId }: { documentId: string }) => {
    const document = await prisma.document.update({
      where: { id: documentId },
      data: {
        isDeleted: true,
      },
    });
    return { document };
  },
  "document.softDelete.start",
  "document.softDelete.success",
  "document.softDelete.error"
);

const updateDocumentTitle = functionLogger(
  async ({ documentId, title }: { documentId: string; title: string }) => {
    const document = await prisma.document.update({
      where: { id: documentId },
      data: { title },
    });
    return { document };
  },
  "document.updateTitle.start",
  "document.updateTitle.success",
  "document.updateTitle.error"
);

export default {
  createDocument,
  softDeleteDocument,
  updateDocumentTitle,
};
