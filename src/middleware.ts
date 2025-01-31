import { clerkMiddleware } from "@clerk/nextjs/server";
import { IdPrefix, randomId } from "@shared/utils/ids";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// all routes protected by default except those here
// these are routes that can and should check auth in their layouts
const isPublicRoute = (path: string) => {
  const publicPaths = [
    "/",
    "/sign-in",
    "/sign-up",
    "/document",
    "/api/trpc/public",
    "/api/liveblocks-auth",
  ];

  // add checks for static files and preload
  const isStaticFile = path.match(/\.(.*)$/);
  const isPreloadFile = path.includes("preload");

  if (isStaticFile || isPreloadFile) {
    return true;
  }

  return publicPaths.some(
    (publicPath) =>
      path.startsWith(publicPath) || path.match(publicPath + "(.*)")
  );
};

const addCorrelationId = (req: NextRequest) => {
  const correlationId = randomId({ prefix: IdPrefix.Correlation });

  // clone response to add correlation id as header
  const response = NextResponse.next();
  response.headers.set("x-correlation-id", correlationId);

  // add correlation id to the request headers for server-side access
  req.headers.set("x-correlation-id", correlationId);

  return response;
};

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req.nextUrl.pathname)) {
    auth.protect();
  }

  return addCorrelationId(req);
});

export const config = {
  matcher: [
    // match all paths except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
