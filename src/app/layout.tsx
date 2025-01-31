import { APP_NAME } from "@frontend/config/config";
import { cn } from "@frontend/lib/utils";
import "@frontend/styles/globals.css";
import type { Metadata } from "next";
import { Onest as FontSans } from "next/font/google";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "AISI Annotate lets you annotate documents quickly and easily.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontSans.variable}>
      {/* we merge this in cause its a common chrome extension that interferes with our stuff */}
      <body className={cn("vsc-initialized")}>{children}</body>
    </html>
  );
}
