"use client";

export const LayoutLanding = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex flex-1 flex-col overflow-y-auto pt-[56px]">
        {children}
      </div>
    </div>
  );
};
