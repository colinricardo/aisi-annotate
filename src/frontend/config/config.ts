export const isProduction =
  process.env.NODE_ENV === "production" ? true : false;

const _getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const BASE_URL = _getBaseUrl();
export const TRPC_URL = `${BASE_URL}/api/trpc`;
export const LIVEBLOCKS_PUBLIC_API_KEY =
  process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY;

export const GIT_COMMIT_SHA = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;

export const APP_NAME = "AISI Annotate";
export const MODAL_SIZE_MEDIUM = "w-[50vw] h-[50vh]";
export const MODAL_SIZE_SMALL = "w-[50vw] h-[25wh]";
