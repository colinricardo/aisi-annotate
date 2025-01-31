import type { AppRouter } from "@backend/routers/root";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

export type { AppRouter };

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;

export type UserModel = RouterOutputs["user"]["current"]["user"];

export type DocumentModel = RouterOutputs["document"]["get"]["document"];
export type DocumentListModel =
  RouterOutputs["document"]["getAll"]["documents"][number];

export type AnnotationType =
  RouterOutputs["document"]["getAnnotationTypes"]["annotationTypes"][number];

export type AnnotationLabel = AnnotationType["label"];
