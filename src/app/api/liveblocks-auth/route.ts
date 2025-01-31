import { LIVEBLOCKS_SECRET } from "@backend/config";
import { log } from "@backend/lib/logger";
import { api } from "@backend/trpc";
import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

const liveblocks = new Liveblocks({
  secret: LIVEBLOCKS_SECRET!,
});

export const POST = async (request: NextRequest) => {
  const { room } = await request.json();

  if (!room) {
    return new Response("Bad Request - Missing room", { status: 400 });
  }

  const { user } = await api.public.maybeGetUser();

  if (user) {
    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name: user.name,
        email: user.email,
      },
    });
    session.allow(room, session.FULL_ACCESS);
    const { status, body } = await session.authorize();
    log("Authorized authenticated session", { status, room });
    return new Response(body, { status });
  }

  // default to anonymous access if no user
  const session = liveblocks.prepareSession("anonymous", {
    userInfo: {
      name: "Anonymous",
      email: "",
    },
  });
  session.allow(room, session.FULL_ACCESS);
  const { status, body } = await session.authorize();
  log("Authorized anonymous session", { status, room });
  return new Response(body, { status });
};
