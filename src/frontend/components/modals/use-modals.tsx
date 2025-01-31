import {
  Modal,
  atomCloseModal,
  atomLastInFocusStack,
  atomOpenModal,
  atomPopFromFocusStack,
  atomPushToFocusStack,
} from "@frontend/stores/modals";
import { useAtomValue, useSetAtom } from "jotai";
import { MutableRefObject } from "react";

export const useOpenModal = () => {
  const pushToFocusStack = useSetAtom(atomPushToFocusStack);
  const openModal = useSetAtom(atomOpenModal);

  return (modal: Modal) => {
    pushToFocusStack(document.activeElement as HTMLElement);
    openModal(modal);
  };
};

export const useCloseModal = () => {
  const closeModal = useSetAtom(atomCloseModal);
  const openModal = useOpenModal();
  const popFromFocusStack = useSetAtom(atomPopFromFocusStack);
  const lastInFocusStack = useAtomValue(atomLastInFocusStack);

  return (modal: Modal, openModalAfter?: Modal) => {
    closeModal(modal);

    setTimeout(() => {
      lastInFocusStack?.focus();
      popFromFocusStack();

      if (openModalAfter) {
        openModal(openModalAfter);
      }
    }, 0);
  };
};

export const useGoDown = () => {
  return ({
    containerRef,
    containerIsFocused,
    focusedRowIndex,
    setFocusedRowIndex,
    rowCount,
  }: {
    containerRef: MutableRefObject<HTMLDivElement | null | undefined>;
    containerIsFocused: boolean;
    focusedRowIndex: number;
    setFocusedRowIndex: (index: number) => void;
    rowCount: number;
  }) => {
    if (containerIsFocused) {
      containerRef.current?.blur();
      setFocusedRowIndex(0);
    } else {
      if (focusedRowIndex + 1 < rowCount) {
        setFocusedRowIndex(focusedRowIndex + 1);
      }
    }
  };
};

export const useGoUp = () => {
  return ({
    containerRef,
    containerIsFocused,
    focusedRowIndex,
    setFocusedRowIndex,
    rowCount,
  }: {
    containerRef: MutableRefObject<HTMLDivElement | null | undefined>;
    containerIsFocused: boolean;
    focusedRowIndex: number;
    setFocusedRowIndex: (index: number) => void;
    rowCount: number;
  }) => {
    if (focusedRowIndex === 0) {
      setFocusedRowIndex(-1);
      containerRef.current?.focus();
    } else {
      if (focusedRowIndex - 1 >= 0) {
        setFocusedRowIndex(focusedRowIndex - 1);
      }
    }
  };
};
