import { logError } from "@backend/lib/logger";
import { api } from "@backend/trpc";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ROUTE_HOME, ROUTE_SIGN_IN } from "@frontend/config/routes";
import { redirect } from "next/navigation";

export default async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect(ROUTE_SIGN_IN);
  }

  const user = await currentUser();

  const { id, emailAddresses, firstName } = user!;
  const { emailAddress: email } = emailAddresses[0];

  const emailName = email!.split("@")[0].split("+")[0];

  await api.user
    .launch({
      userId: id,
      email: email!,
      name: firstName || emailName,
    })
    .catch((err) => {
      logError("Could not launch user", err, {
        id,
        email,
        firstName,
      });
      return redirect(ROUTE_SIGN_IN);
    });

  redirect(ROUTE_HOME);
};
