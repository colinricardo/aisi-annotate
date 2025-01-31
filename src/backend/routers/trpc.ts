import { auth, currentUser } from "@clerk/nextjs/server";
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { setToStore } from "@backend/lib/store";

export const createTRPCContext = async (opts: {
  headers: Headers;
  correlationId: string;
}) => {
  setToStore({
    key: "context",
    obj: { correlationId: opts.correlationId },
  });
  return {
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// for server-side callers
export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

// middleware for authing trpc procedures
const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  const { userId } = await auth();

  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const user = await currentUser();

  setToStore({
    key: "context",
    obj: { userId: user?.id },
  });

  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});

const isMaybeAuthenticated = t.middleware(async ({ ctx, next }) => {
  const user = await currentUser();

  if (user) {
    setToStore({
      key: "context",
      obj: { userId: user.id },
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: user || null,
    },
  });
});

const setCorrelationId = t.middleware(async ({ ctx, next }) => {
  setToStore({
    key: "context",
    obj: { correlationId: ctx.correlationId },
  });
  return next({ ctx });
});

export const publicProcedure = t.procedure
  .use(setCorrelationId)
  .use(isMaybeAuthenticated);

export const privateProcedure = t.procedure
  .use(setCorrelationId)
  .use(isAuthenticated);
