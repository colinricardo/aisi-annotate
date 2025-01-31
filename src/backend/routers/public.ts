import { getters } from "@backend/db/db";
import { createTRPCRouter, publicProcedure } from "@backend/routers/trpc";
import { z } from "zod";

export const publicRouter = createTRPCRouter({
  getDocument: publicProcedure
    .input(z.object({ documentId: z.string() }))
    .query(async ({ input }) => {
      const { documentId } = input;
      const { document } = await getters.document.getDocumentPublicById({
        documentId,
      });
      return { document };
    }),

  maybeGetUser: publicProcedure.query(async ({ ctx }) => {
    const { user } = ctx;

    if (!user) {
      return { user: null };
    }

    const { id: userId } = user!;
    const { user: u } = await getters.user.getUserById({ userId });
    return { user: u };
  }),
});
