"use client";

import { AnnotationPanel } from "@frontend/components/editor/annotation/annotation-panel";
import { Sidebar, SidebarContent } from "@frontend/components/ui/sidebar";

export const AppSidebarRight = () => {
  return (
    <Sidebar side="right" variant="sidebar" collapsible="offcanvas">
      <SidebarContent className="flex flex-col h-full">
        <AnnotationPanel />
      </SidebarContent>
    </Sidebar>
  );
};
