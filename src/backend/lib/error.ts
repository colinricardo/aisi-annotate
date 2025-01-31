import { logError } from "@backend/lib/logger";
import { TRPCError } from "@trpc/server";
import { HttpError } from "http-errors";
import { NextRequest, NextResponse } from "next/server";

type RouteHandler = (req: NextRequest) => Promise<Response>;

export const httpErrorHandler = (route: RouteHandler): RouteHandler => {
  return async (req) => {
    try {
      return await route(req);
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.status !== 500) {
          return NextResponse.json(
            { message: err.message },
            { status: err.status }
          );
        }
      }
      logError("Something went wrong", err);
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  };
};

export const errorHandler = (route: RouteHandler): RouteHandler => {
  return async (req) => {
    try {
      return await route(req);
    } catch (err) {
      const isHttpError = err instanceof HttpError;
      const isTrpcError = err instanceof TRPCError;

      if (isTrpcError) {
        const errorMessage = err.message;
        const status = err.code === "BAD_REQUEST" ? 400 : 500;
        logError(errorMessage, err);
        return NextResponse.json({ message: errorMessage }, { status });
      } else if (isHttpError) {
        const errorMessage = err.message;
        const status = err.status || 500;
        return NextResponse.json({ message: errorMessage }, { status });
      } else {
        logError("Something went wrong.", err);
        return NextResponse.json(
          { message: "Something went wrong." },
          { status: 500 }
        );
      }
    }
  };
};
