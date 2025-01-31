import { atomOpenModals } from "@frontend/stores/modals";
import { useAtomValue } from "jotai";

export const GlobalModals = () => {
  const openModals = useAtomValue(atomOpenModals);

  const renderMain = () => {
    return <></>;
  };

  const render = () => {
    return renderMain();
  };

  return render();
};
