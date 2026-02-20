import React from "react";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { auth } from "@/lib/auth/auth";
import { LayoutWrapper } from "./layout-wrapper";

export const metadata: Metadata = {
  title: "Algo Master",
  description:
    "Algo Master is a DSA revision enginer design for competitive programming.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = React.use(auth());
  console.log(session, "session from server");

  return (
    <html lang="en">
      <body cz-shortcut-listen="false">
        <NuqsAdapter>
          <LayoutWrapper session={session}>{children}</LayoutWrapper>
        </NuqsAdapter>
      </body>
    </html>
  );
}
