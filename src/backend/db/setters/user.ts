import { functionLogger } from "@backend/lib/logger";
import prisma from "@backend/prisma/client";
import { getUnixTimestamp } from "@shared/utils/general";

const launchUser = functionLogger(
  async ({
    userId,
    email,
    name,
  }: {
    userId: string;
    email: string;
    name: string;
  }) => {
    const timestamp = getUnixTimestamp();

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { id: userId },
        update: {
          email,
          name,
          updatedAt: timestamp,
        },
        create: {
          id: userId,
          email,
          name,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      });

      const isNewUser = user.createdAt === timestamp;

      return { user, isNewUser };
    });

    return result;
  },
  "user.launch.start",
  "user.launch.success",
  "user.launch.error"
);
export default { launchUser };
