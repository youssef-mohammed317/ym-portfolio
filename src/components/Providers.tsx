"use client";

import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { PortfolioProvider } from "@/context/PortfolioContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PortfolioProvider>{children}</PortfolioProvider>
    </ThemeProvider>
  );
}
