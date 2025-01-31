"use client";

import { AppProgressBar } from "next-nprogress-bar";

export const ProgressBar = () => {
  return (
    <AppProgressBar
      options={{
        showSpinner: false,
      }}
      height="3px"
      color="hsl(var(--primary))"
    />
  );
};
