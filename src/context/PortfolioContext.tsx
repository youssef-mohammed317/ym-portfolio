"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import defaultData from "@/data/data.json";
import { PortfolioData } from "@/types/portfolio";

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (updater: (prev: PortfolioData) => PortfolioData) => void;
  resetData: () => void;
  exportDataJson: () => void;
  isModified: boolean;
}

const typedDefaultData = defaultData as unknown as PortfolioData;

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(typedDefaultData);
  const [isModified, setIsModified] = useState(false);

  // Clean up any legacy template draft stored in browser
  useEffect(() => {
    try {
      localStorage.removeItem("portfolio-custom-data");
    } catch {
      // ignore
    }
    setData(typedDefaultData);
  }, []);

  const updateData = (updater: (prev: PortfolioData) => PortfolioData) => {
    setData((prev) => updater(prev));
    setIsModified(true);
  };

  const resetData = () => {
    setData(typedDefaultData);
    setIsModified(false);
  };

  const exportDataJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetData,
        exportDataJson,
        isModified,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
