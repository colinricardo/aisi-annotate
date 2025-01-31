export const isProduction =
  process.env.NODE_ENV === "production" ? true : false;

export const GIT_COMMIT_SHA = process.env.VERCEL_GIT_COMMIT_SHA;
export const APP_NAME = "AISI Annotate";

export const LIVEBLOCKS_SECRET = process.env.LIVEBLOCKS_SECRET;
