"use client";
import { createContext, useContext } from "react";

// 1. Define the context value type
interface SettingContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// 2. Create the context with a default value (can be undefined)
export const SettingContext = createContext<SettingContextType | undefined>(
  undefined
);

// 4. Create a custom hook for consuming the context
export const useSetting = () => {
  const context = useContext(SettingContext);
  return context;
};
