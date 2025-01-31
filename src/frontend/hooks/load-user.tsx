"use client";

import { useAppStore } from "@frontend/stores/app-store";
import { api } from "@frontend/trpc";
import { type UserModel } from "@shared/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const UserLoader = () => {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  const user = useAppStore((state) => state.user);

  const { data } = api.user.current.useQuery(undefined, {
    enabled: !user,
  });

  useEffect(() => {
    if (!data?.user) {
      return;
    }
    setUser(data.user as UserModel);
  }, [data?.user]);

  return null;
};
