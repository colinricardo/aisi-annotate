"use client";

import {
  getBlockContext as getBlockContextAction,
  getSurroundingContext as getSurroundingContextAction,
} from "@frontend/components/editor/editor-actions";
import { useEditor } from "@frontend/components/editor/editor-types";

export const useEditorActions = () => {
  const { editor } = useEditor();

  const getBlockContext = () => {
    if (!editor) return undefined;
    return getBlockContextAction({ editor });
  };

  const getSurroundingContext = () => {
    if (!editor) return undefined;
    return getSurroundingContextAction({ editor });
  };

  return {
    getBlockContext,
    getSurroundingContext,
  };
};
