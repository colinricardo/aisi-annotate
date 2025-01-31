import { Button } from "@frontend/components/ui/button";
import { Card, CardContent } from "@frontend/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@frontend/components/ui/dialog";
import { Progress } from "@frontend/components/ui/progress";
import { Modal, atomOpenModals } from "@frontend/stores/modals";
import { useAtom } from "jotai";
import {
  ListTree,
  MousePointerClick,
  PanelRight,
  Rocket,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export const ModalOnboarding = () => {
  const [activeModals, setActiveModals] = useAtom(atomOpenModals);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      title: "Select Text",
      content:
        "To start annotating, select any text in your document. A floating menu will appear.",
      icon: MousePointerClick,
    },
    {
      title: "Choose Entity Type",
      content:
        "From the floating menu, select an entity type to annotate your text.",
      icon: ListTree,
    },
    {
      title: "Remove Annotations",
      content:
        "To remove an annotation, simply click highlighted text and click the existing annotation to remove it.",
      icon: XCircle,
    },
    {
      title: "View Annotations",
      content: "Open the right panel to see all your annotations in one place.",
      icon: PanelRight,
    },
    {
      title: "Ready to Go!",
      content: "You're all set to start annotating!",
      icon: Rocket,
    },
  ];

  const closeModal = () => {
    setActiveModals(activeModals.filter((modal) => modal !== Modal.Onboarding));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      closeModal();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderContent = () => {
    const StepIcon = steps[currentStep - 1].icon;
    return (
      <Card className="flex flex-col items-center justify-center w-full h-full border-none shadow-none">
        <CardContent className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16 p-2 mb-8 rounded-full bg-secondary">
            <StepIcon className="w-8 h-8 text-secondary-foreground" />
          </div>
          <div className="flex items-center justify-center h-24">
            <p className="text-lg text-center max-w-[80%]">
              {steps[currentStep - 1].content}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderFooter = () => (
    <DialogFooter className="flex flex-col mt-6 sm:flex-row gap-2">
      <Button
        aria-label="Back"
        variant="outline"
        onClick={handleBack}
        disabled={currentStep === 1}
        className="w-full sm:w-auto"
      >
        Back
      </Button>
      <Button
        aria-label="Next"
        variant="default"
        onClick={handleNext}
        className="w-full sm:w-auto"
      >
        {currentStep === steps.length ? "Get Started" : "Next"}
      </Button>
    </DialogFooter>
  );

  const renderMain = () => (
    <Dialog
      open={activeModals.includes(Modal.Onboarding)}
      onOpenChange={closeModal}
    >
      <DialogContent className="sm:max-w-[550px] h-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {steps[currentStep - 1].title}
          </DialogTitle>
        </DialogHeader>
        <Progress
          value={(currentStep / steps.length) * 100}
          className="mt-2 bg-muted [&>div]:bg-primary"
        />
        <div className="mt-2 text-sm text-center text-muted-foreground">
          Step {currentStep} of {steps.length}
        </div>
        <div className="flex items-center justify-center flex-grow overflow-y-auto">
          {renderContent()}
        </div>
        {renderFooter()}
      </DialogContent>
    </Dialog>
  );

  return renderMain();
};
