import { api } from "@backend/trpc";
import { ROUTE_DOCUMENT } from "@frontend/config/routes";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export const dynamic = "force-dynamic";

export default async () => {
  await connection();

  const { document } = await api.document.create({
    title: "",
  });

  return redirect(`${ROUTE_DOCUMENT}/${document.id}`);
};
