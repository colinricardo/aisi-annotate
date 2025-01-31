"use client";

import { DarkModeToggle } from "@frontend/components/common/dark-mode-toggle";

export const HeaderButtons = () => {
  return (
    <div className="flex items-center gap-2 px-3">
      <DarkModeToggle />
    </div>
  );
};
