import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "@shared/types";

export const api = createTRPCReact<AppRouter>();
