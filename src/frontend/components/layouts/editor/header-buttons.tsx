"use client";

import { OnboardingButton } from "@frontend/components/common/onboarding-button";
import { SidebarTrigger } from "@frontend/components/ui/sidebar";

export const HeaderButtons = () => {
  return (
    <div className="flex items-center gap-2 px-3">
      <OnboardingButton />
      <SidebarTrigger side="right" />
    </div>
  );
};
