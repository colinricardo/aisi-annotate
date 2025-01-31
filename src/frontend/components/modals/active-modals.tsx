"use client";


import { GlobalModals } from "@frontend/components/modals/global-modals";
import { ModalOnboarding } from "@frontend/components/modals/modal-onboarding";
import { Modal, atomOpenModals } from "@frontend/stores/modals";
import { useAtomValue } from "jotai";

export const ActiveModals = () => {
  const openModals = useAtomValue(atomOpenModals);

  const renderMain = () => {
    return (
      <>
        <GlobalModals />
        {openModals.includes(Modal.Onboarding) && <ModalOnboarding />}
      </>
    );
  };

  const render = () => {
    return renderMain();
  };

  return render();
};
