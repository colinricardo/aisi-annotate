import "server-only";

import { headers, type UnsafeUnwrappedHeaders } from "next/headers";
import { cache } from "react";

import { store } from "@backend/lib/store";
import { createCaller } from "@backend/routers/root";
import { createTRPCContext } from "@backend/routers/trpc";
import { IdPrefix, randomId } from "@shared/utils/ids";

// provides the required context for the trpc api when called server-side
// we add in correlation id
const createServerContext = cache(() => {
  return new Promise<{ headers: Headers; correlationId: string }>((resolve) => {
    store.run({}, async () => {
      const heads = new Headers(
        (await headers()) as unknown as UnsafeUnwrappedHeaders
      );
      heads.set("x-trpc-source", "rsc");

      const correlationId =
        heads.get("x-correlation-id") ??
        randomId({ prefix: IdPrefix.Correlation });

      resolve({
        headers: heads,
        correlationId,
      });
    });
  }).then(createTRPCContext);
});

export const api = createCaller(createServerContext);
