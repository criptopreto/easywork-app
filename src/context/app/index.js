"use client";

import { useContext } from "react";
import { AppContext } from "..";

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
}

export default useAppContext;
