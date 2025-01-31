import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ProgressBar } from "@frontend/components/common/progress-bar";
import { ActiveModals } from "@frontend/components/modals/active-modals";
import { TooltipProvider } from "@frontend/components/ui/tooltip";
import { APP_NAME } from "@frontend/config/config";
import { ROUTE_SIGN_IN } from "@frontend/config/routes";
import { JotaiProvider } from "@frontend/providers/jotai-provider";
import { ThemeProvider } from "@frontend/providers/theme-provider";
import { TRPCReactProvider } from "@frontend/providers/trpc-provider";
import { AppStoreProvider } from "@frontend/stores/app-store";
import { EditorStoreProvider } from "@frontend/stores/editor-store";
import "@frontend/styles/globals.css";

import { Toaster } from "@frontend/components/ui/sonner";
import { UserLoader } from "@frontend/hooks/load-user";
import type { Metadata } from "next";
import { Onest as FontSans } from "next/font/google";

import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "AISI Annotate lets you annotate documents quickly and easily.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    return redirect(ROUTE_SIGN_IN);
  }

  return (
    <ClerkProvider
      appearance={{
        elements: {
          button: "bg-primary text-foreground hover:bg-primary/90",
        },
      }}
    >
      <div className="min-h-screen bg-background font-sans antialiased [&_:focus:not(:focus-visible)]:outline-none [&_:focus:not(:focus-visible)]:ring-0 focus:outline-none focus:ring-0">
        <ThemeProvider attribute="class" defaultTheme="light">
          <TRPCReactProvider>
            <JotaiProvider>
              <AppStoreProvider>
                <EditorStoreProvider>
                  <TooltipProvider delayDuration={100}>
                    <UserLoader />
                    {children}
                  </TooltipProvider>
                  <ActiveModals />
                </EditorStoreProvider>
              </AppStoreProvider>
            </JotaiProvider>
          </TRPCReactProvider>
        </ThemeProvider>

        <div className="absolute bottom-0 right-0">
          <Toaster />
        </div>
        <ProgressBar />
      </div>
    </ClerkProvider>
  );
}
