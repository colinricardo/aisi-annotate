"use client";

import { useEffect } from "react";

export const PageError = ({
  error,
  message = "Something went wrong!",
  subMessage = "We apologize for the inconvenience. Please try again.",
}: {
  error: Error;
  message?: string;
  subMessage?: string;
}) => {
  useEffect(() => {
    // todo: obviously in real life this would report the error to somewhere
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="flex items-center justify-center flex-1 rounded-lg  shadow-sm h-screen">
        <div className="flex flex-col items-center text-center space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">{message}</h3>
          <p className="text-sm text-muted-foreground">{subMessage}</p>
        </div>
      </div>
    </>
  );
};
