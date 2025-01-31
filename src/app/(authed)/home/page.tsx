import { api } from "@backend/trpc";
import { PageHome } from "@frontend/components/pages/page-home";
import { connection } from "next/server";

export const dynamic = "force-dynamic";

export default async () => {
  await connection();

  const { documents } = await api.document.getAll();
  return <PageHome initialDocuments={documents} />;
};
