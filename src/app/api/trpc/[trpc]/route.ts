import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { errorHandler } from "@backend/lib/error";
import { store } from "@backend/lib/store";
import { appRouter } from "@backend/routers/root";
import { createTRPCContext } from "@backend/routers/trpc";
import { IdPrefix, randomId } from "@shared/utils/ids";

const createRouteContext = async (req: NextRequest) => {
  const correlationId =
    req.headers.get("x-correlation-id") ??
    randomId({ prefix: IdPrefix.Correlation });

  return createTRPCContext({
    headers: req.headers,
    correlationId,
  });
};

export const GET = errorHandler(async (req: NextRequest): Promise<Response> => {
  return store.run({}, async () => {
    const result = await fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext: () => createRouteContext(req),
    });
    return result;
  });
});

export const POST = GET;
