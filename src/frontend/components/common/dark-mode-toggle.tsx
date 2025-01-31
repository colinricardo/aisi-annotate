"use client";

import { Button } from "@frontend/components/ui/button";
import { cn } from "@frontend/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const DarkModeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      name="dark-mode-toggle"
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Sun
        className={cn("h-2 w-2", theme === "dark" && "hidden")}
        aria-hidden="true"
      />
      <Moon
        className={cn("h-2 w-2", theme === "light" && "hidden")}
        aria-hidden="true"
      />
    </Button>
  );
};
