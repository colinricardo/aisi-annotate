// note: obviously in here we would connect to a proper logging service like betterstack
import { GIT_COMMIT_SHA } from "@backend/config";
import { getFromStore } from "@backend/lib/store";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { HttpError } from "http-errors";

const commit = GIT_COMMIT_SHA?.slice(0, 7);

const stringifyError = (err: any) => {
  if (err instanceof Error) {
    return { message: err.message, stack: err.stack };
  } else {
    return err;
  }
};

type LogContext = {
  correlationId: any;
  userId: any;
  commit: string | undefined;
  source: string;
  error?: any;
  [key: string]: any;
};

export const log = (s: string, extra?: object) => {
  const ctx = getFromStore({ key: "context" });
  const { correlationId, userId } = ctx;
  const context: LogContext = {
    correlationId,
    userId,
    commit,
    source: "api",
    ...extra,
  };

  console.log(s, context);
};

export const logError = (
  s: string,
  err?: Error | null | unknown,
  extra?: object
) => {
  const ctx = getFromStore({ key: "context" });
  const { correlationId, userId } = ctx;
  const context: LogContext = {
    correlationId,
    userId,
    commit,
    source: "api",
    ...extra,
  };

  if (err) {
    const errString = stringifyError(err);
    context.error = errString;
  }

  console.error(`Error: ${s}`, context);
};

export const logWarning = (
  s: string,
  err?: Error | null | unknown,
  extra?: object
) => {
  const ctx = getFromStore({ key: "context" });
  const { correlationId, userId } = ctx;
  const context: LogContext = {
    correlationId,
    userId,
    commit,
    source: "api",
    ...extra,
  };

  if (err) {
    const errString = stringifyError(err);
    context.error = errString;
  }

  console.warn(`Warning: ${s}`, context);
};

export const functionLogger = <ArgType extends object | undefined, ReturnType>(
  fn: (arg: ArgType) => Promise<ReturnType>,
  infoMessage: string,
  successMessage: string,
  errorMessage: string,
  logOutput: boolean = true,
  maskList: string[] = []
): ((arg: ArgType) => Promise<ReturnType>) => {
  return async (arg: ArgType) => {
    const maskedArg = maskProperties(arg, maskList);
    log(infoMessage, maskedArg);
    try {
      const result = await fn(arg);
      if (logOutput) {
        const maskedResult = maskProperties(
          result as object | undefined,
          maskList
        );
        log(successMessage, { input: maskedArg, output: maskedResult });
      } else {
        log(successMessage, { input: maskedArg });
      }
      return result;
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        logError(errorMessage, err, { input: maskedArg });
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot create duplicate record.",
        });
      }

      if (err instanceof TRPCError) {
        if (err.code === "BAD_REQUEST") {
          logWarning(errorMessage, err, { input: maskedArg });
          throw err;
        } else {
          logError(errorMessage, err, { input: maskedArg });
          throw err;
        }
      } else if (err instanceof HttpError) {
        logError(errorMessage, err, { input: maskedArg });
        throw err;
      } else {
        logError(errorMessage, err, { input: maskedArg });
        throw err;
      }
    }
  };
};

const maskProperties = <T extends object | undefined>(
  obj: T,
  maskList: string[]
): T => {
  if (!obj || typeof obj !== "object") return obj;
  return Object.entries(obj).reduce((acc: T, [key, value]) => {
    if (maskList.includes(key)) {
      (acc as any)[key] = "[MASKED]";
    } else if (typeof value === "object" && value !== null) {
      (acc as any)[key] = maskProperties(value, maskList);
    } else {
      (acc as any)[key] = value;
    }
    return acc;
  }, {} as T);
};
