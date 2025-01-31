"use client";

import { UserModel } from "@shared/types";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type AppState = {
  user: UserModel | null;
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
};

export type AppActions = {
  setUser: (user: UserModel | null) => void;
  setLeftSidebarOpen: (open: boolean) => void;
  setRightSidebarOpen: (open: boolean) => void;
};

export type AppStore = AppState & AppActions;

export const defaultInitState: AppState = {
  user: null,
  leftSidebarOpen: false,
  rightSidebarOpen: true,
};

export const initAppStore = (): AppState => {
  return defaultInitState;
};

export const createAppStore = (initState: AppState = defaultInitState) =>
  createStore<AppStore>()(
    persist(
      (set) => ({
        ...initState,
        setUser: (user) => set({ user }),
        setLeftSidebarOpen: (open) => set({ leftSidebarOpen: open }),
        setRightSidebarOpen: (open) => set({ rightSidebarOpen: open }),
      }),
      {
        name: "app-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<AppStoreApi | undefined>(
  undefined
);

export interface AppStoreProviderProps {
  children: ReactNode;
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
  const storeRef = useRef<AppStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createAppStore(initAppStore());
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext);
  if (!appStoreContext) {
    throw new Error("useAppStore must be used within AppStoreProvider");
  }
  return useStore(appStoreContext, selector);
};
