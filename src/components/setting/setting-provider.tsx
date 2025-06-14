'use client'
import { ReactNode, useState } from "react";
import { SettingContext } from "./setting-context";

// 3. Create a provider component
export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <SettingContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </SettingContext.Provider>
  );
};
