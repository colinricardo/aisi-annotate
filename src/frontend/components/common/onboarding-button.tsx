"use client";

import { useOpenModal } from "@frontend/components/modals/use-modals";
import { Button } from "@frontend/components/ui/button";
import { Modal } from "@frontend/stores/modals";
import { HelpCircle } from "lucide-react";

export const OnboardingButton = () => {
  const openModal = useOpenModal();

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-7 w-7"
      onClick={() => openModal(Modal.Onboarding)}
      aria-label="Open onboarding"
    >
      <HelpCircle className="w-4 h-4" />
      <span className="sr-only">open onboarding</span>
    </Button>
  );
};
