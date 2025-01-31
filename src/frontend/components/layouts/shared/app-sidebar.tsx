"use client";

import * as React from "react";

import { NavMain } from "@frontend/components/layouts/shared/nav-main";
import { NavUser } from "@frontend/components/layouts/shared/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@frontend/components/ui/sidebar";
import { APP_NAME } from "@frontend/config/config";
import { useAppStore } from "@frontend/stores/app-store";

export const AppSidebar = ({
  ...props
}: {} & React.ComponentProps<typeof Sidebar>) => {
  const leftSidebarOpen = useAppStore((state) => state.leftSidebarOpen);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 shrink-0 rounded-lg select-none bg-primary flex items-center justify-center text-primary-foreground font-medium">
            {APP_NAME.charAt(0)}
          </div>
          {leftSidebarOpen && (
            <div className="grid flex-1 text-left text-sm leading-tight select-none">
              <span className="truncate font-semibold">{APP_NAME}</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};
