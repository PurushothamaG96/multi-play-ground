"use client";
import { ReactNode, useState } from "react";
import { SettingContext } from "./setting-context";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "@/utits/snackbar";

// 3. Create a provider component
export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const modeInQuery = searchParams.get("mode") === "dark";
  const [darkMode, setDarkMode] = useState(modeInQuery);

  // When toggled, update state AND query string
  const toggleDarkMode = () => {
    const newMode = darkMode ? "dark" : "light";

    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", newMode);

    router.replace(`${pathname}?${params.toString()}`);
    setDarkMode(!darkMode);
  };

  return (
    <SettingContext.Provider value={{ darkMode, toggleDarkMode }}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={3000}
      >
         <SnackbarUtilsConfigurator />
        {children}
      </SnackbarProvider>
    </SettingContext.Provider>
  );
};
