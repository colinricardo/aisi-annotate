"use client";

import { Home, LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@frontend/components/ui/sidebar";

type NavSubItem = {
  title: string;
  url: string;
  icon?: LucideIcon | null;
  id?: string;
};

type NavItem = {
  title: string;
  icon: LucideIcon;
  isActive: boolean;
  items: NavSubItem[];
};

export const TeamNavItem = ({ subItem }: { subItem: NavSubItem }) => {
  return (
    <SidebarMenuSubItem className="group/menu-sub-item relative">
      <SidebarMenuSubButton asChild>
        <a href={subItem.url} className="select-none">
          {subItem.icon && <subItem.icon className="size-4" />}
          <span>{subItem.title}</span>
        </a>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};

export const NavMain = () => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="/home" className="select-none">
              <Home className="size-4" />
              <span>Home</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};
