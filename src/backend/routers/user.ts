import { getters, setters } from "@backend/db/db";
import { createTRPCRouter, privateProcedure } from "@backend/routers/trpc";

import { z } from "zod";

export const userRouter = createTRPCRouter({
  current: privateProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user!;
    const { user } = await getters.user.getUserById({ userId });
    return { user };
  }),

  launch: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        email: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, email, name } = input;
      const { user } = await setters.user.launchUser({
        userId,
        email,
        name,
      });
      return { user };
    }),
});
