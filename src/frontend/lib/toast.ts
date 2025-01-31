"use client";

import { toast } from "sonner";

type ToastOptions = {
  description?: string;
  duration?: number;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
};

export const successToast = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    className:
      "rounded-base shadow-light border-2 border-border bg-card text-primary-foreground",
    ...options,
  });
};

export const errorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    className:
      "rounded-base shadow-light border-2 border-border bg-destructive text-destructive-foreground",
    ...options,
  });
};

export const infoToast = (message: string, options?: ToastOptions) => {
  toast(message, {
    className:
      "rounded-base shadow-light border-2 border-border bg-card text-primary-foreground",
    ...options,
  });
};
