import { functionLogger } from "@backend/lib/logger";
import prisma from "@backend/prisma/client";
import { TRPCError } from "@trpc/server";

const getUserById = functionLogger(
  async ({ userId }: { userId: string }) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  },
  "user.getById.start",
  "user.getById.success",
  "user.getById.error"
);

export default { getUserById };
