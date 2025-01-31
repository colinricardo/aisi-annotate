import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ContainerPage = ({ children }: Props) => (
  <div
    className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)] outline-none"
    tabIndex={-1}
  >
    {children}
  </div>
);
