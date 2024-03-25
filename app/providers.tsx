"use client";

import { ReactNode } from "react";
import ThemeProvider from "@/components/Theme-Provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </>
  );
}
