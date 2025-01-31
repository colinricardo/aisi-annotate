import { documentRouter } from "@backend/routers/document";
import { publicRouter } from "@backend/routers/public";
import { createCallerFactory, createTRPCRouter } from "@backend/routers/trpc";
import { userRouter } from "@backend/routers/user";

export const appRouter = createTRPCRouter({
  document: documentRouter,
  user: userRouter,
  public: publicRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
