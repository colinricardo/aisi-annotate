import { atom } from "jotai";

export enum Modal {
  Debugger = "DEBUGGER",
  Onboarding = "ONBOARDING",
}

// all currently open modals.
// note: put debug here if you want it
export const atomOpenModals = atom<Modal[]>([]);

export const atomOpenModal = atom(null, (get, set, modal) => {
  const currentModals = get(atomOpenModals);
  set(atomOpenModals, [...currentModals, modal] as Modal[]);
});

export const atomCloseModal = atom(null, (get, set, modal) => {
  const currentModals = get(atomOpenModals);
  set(
    atomOpenModals,
    currentModals.filter((m) => m !== modal)
  );
});

// tracks elements that have been focused in the past w.r.t. modals
// that is, when we enter a modal, we want to return focus to where we were upon entering, and this is how we do it
export const atomModalFocusStack = atom<HTMLElement[]>([]);

// pushes a new element to the focus stack.
export const atomPushToFocusStack = atom(
  null,
  (get, set, update: HTMLElement | null) => {
    const currentStack = get(atomModalFocusStack);
    if (update) {
      set(atomModalFocusStack, [...currentStack, update] as HTMLElement[]);
    }
  }
);

// pops the last element from the focus stack
export const atomPopFromFocusStack = atom(null, (get, set) => {
  const currentStack = get(atomModalFocusStack);
  if (currentStack.length > 0) {
    set(atomModalFocusStack, currentStack.slice(0, -1));
  }
});

// returns the last element in the focus stack
export const atomLastInFocusStack = atom((get) => {
  const stack = get(atomModalFocusStack);
  return stack[stack.length - 1] || null;
});

export const isAnyModalOpen = atom((get) => {
  const list = get(atomModalFocusStack);
  const listWithoutDebugger = list.filter((m) => m.id !== "DEBUGGER");
  return listWithoutDebugger.length > 0;
});
