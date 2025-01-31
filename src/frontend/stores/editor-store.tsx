"use client";

import { type EditorInstance } from "@frontend/components/editor/editor-types";
import { DocumentModel } from "@shared/types";
import type { Range } from "@tiptap/react";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export type EditorState = {
  currentDocument: DocumentModel | null;
  query: string;
  range: Range | null;
  charsCount: number | undefined;
  isTyping: boolean;
  awarenessStates: any[];
  editorInstance: EditorInstance | null;
  disableInteractions: boolean;
  isWorking: boolean;
  debug: boolean;
  blockContext: string | undefined;
  surroundingContext: string | undefined;
  selectedText: string | undefined;
};

export type EditorActions = {
  setDocument: (document: DocumentModel | null) => void;
  setQuery: (query: string) => void;
  setRange: (range: Range | null) => void;
  setCharsCount: (count: number | undefined) => void;
  setIsTyping: (isTyping: boolean) => void;
  setAwarenessStates: (states: any[]) => void;
  setEditorInstance: (editor: EditorInstance | null) => void;
  setDisableInteractions: (disable: boolean) => void;
  setIsWorking: (isWorking: boolean) => void;
  setDebug: (debug: boolean) => void;
  setBlockContext: (context: string | undefined) => void;
  setSurroundingContext: (context: string | undefined) => void;
  setSelectedText: (text: string | undefined) => void;
};

export type EditorStore = EditorState & EditorActions;

export const initEditorStore = (): EditorState => {
  return {
    currentDocument: null,
    query: "",
    range: null,
    charsCount: undefined,
    isTyping: false,
    awarenessStates: [],
    editorInstance: null,
    disableInteractions: false,
    isWorking: false,
    debug: false,
    blockContext: undefined,
    surroundingContext: undefined,
    selectedText: undefined,
  };
};

export const defaultInitState: EditorState = {
  currentDocument: null,
  query: "",
  range: null,
  charsCount: undefined,
  isTyping: false,
  awarenessStates: [],
  editorInstance: null,
  disableInteractions: false,
  isWorking: false,
  debug: false,
  blockContext: undefined,
  surroundingContext: undefined,
  selectedText: undefined,
};

export const createEditorStore = (
  initState: EditorState = defaultInitState
) => {
  return createStore<EditorStore>()((set) => ({
    ...initState,
    setDocument: (document) => set({ currentDocument: document }),
    setQuery: (query) => set({ query }),
    setRange: (range) => set({ range }),
    setCharsCount: (charsCount) => set({ charsCount }),
    setIsTyping: (isTyping) => set({ isTyping }),
    setAwarenessStates: (awarenessStates) => set({ awarenessStates }),
    setEditorInstance: (editorInstance) => set({ editorInstance }),
    setDisableInteractions: (disableInteractions) =>
      set({ disableInteractions }),
    setIsWorking: (isWorking) => set({ isWorking }),
    setDebug: (debug) => set({ debug }),
    setBlockContext: (blockContext) => set({ blockContext }),
    setSurroundingContext: (surroundingContext) => set({ surroundingContext }),
    setSelectedText: (selectedText) => set({ selectedText }),
  }));
};

export type EditorStoreApi = ReturnType<typeof createEditorStore>;

export const EditorStoreContext = createContext<EditorStoreApi | undefined>(
  undefined
);

export interface EditorStoreProviderProps {
  children: ReactNode;
}

export const EditorStoreProvider = ({ children }: EditorStoreProviderProps) => {
  const storeRef = useRef<EditorStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createEditorStore(initEditorStore());
  }

  return (
    <EditorStoreContext.Provider value={storeRef.current}>
      {children}
    </EditorStoreContext.Provider>
  );
};

export const useEditorStore = <T,>(selector: (store: EditorStore) => T): T => {
  const editorStoreContext = useContext(EditorStoreContext);

  if (!editorStoreContext) {
    throw new Error(`useEditorStore must be used within EditorStoreProvider`);
  }

  const store = useRef(editorStoreContext).current;
  return useStore(store, selector);
};
