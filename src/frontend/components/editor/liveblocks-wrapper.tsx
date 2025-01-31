"use client";

import { LoadingSpinner } from "@frontend/components/common/loading-spinner";
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { DocumentModel } from "@shared/types";
import { ReactNode } from "react";

type RoomProps = {
  children: ReactNode;
  document: DocumentModel;
};

type Presence = {
  id: string;
  info: {
    name: string;
    email: string;
  };
};

const client = createClient({
  authEndpoint: async (room) => {
    let attempt = 0;
    let backoff = 500;
    const maxTries = 3;

    while (attempt < maxTries) {
      try {
        const res = await fetch("/api/liveblocks-auth", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ room }),
        });
        if (!res.ok) throw new Error(`http error: ${res.status}`);
        return await res.json();
      } catch (err) {
        attempt++;
        await new Promise((r) => setTimeout(r, backoff));
        backoff *= 2;
      }
    }

    throw new Error("liveblocks auth failed after multiple retries");
  },
  lostConnectionTimeout: 30000,
});

const { RoomProvider, useRoom } = createRoomContext<Presence>(client);

export const LiveBlocksWrapper = ({ children, document }: RoomProps) => {
  const documentId = document?.id;

  if (!documentId) return null;

  return (
    <RoomProvider
      id={documentId}
      initialPresence={{ id: "", info: { name: "", email: "" } }}
    >
      <ClientSideSuspense
        fallback={
          <div className="w-screen h-screen flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
