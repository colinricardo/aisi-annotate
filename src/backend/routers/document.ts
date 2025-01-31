import { getters, setters } from "@backend/db/db";
import { createTRPCRouter, privateProcedure } from "@backend/routers/trpc";
import { z } from "zod";

export const documentRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user!;
      const { title } = input;
      const { document } = await setters.document.createDocument({
        title,
        userId,
      });
      return { document };
    }),

  get: privateProcedure
    .input(
      z.object({
        documentId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { documentId } = input;
      const { document } = await getters.document.getDocumentPublicById({
        documentId,
      });
      return { document };
    }),

  softDelete: privateProcedure
    .input(
      z.object({
        documentId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { documentId } = input;
      const { document } = await setters.document.softDeleteDocument({
        documentId,
      });
      return { document };
    }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    const { documents } = await getters.document.getAllDocuments({});
    return { documents };
  }),

  updateTitle: privateProcedure
    .input(
      z.object({
        documentId: z.string(),
        title: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { documentId, title } = input;
      const { document } = await setters.document.updateDocumentTitle({
        documentId,
        title,
      });
      return { document };
    }),

  getAnnotationTypes: privateProcedure.query(async () => {
    const { annotationTypes } = await getters.document.getAnnotationTypes({});
    return { annotationTypes };
  }),
});
