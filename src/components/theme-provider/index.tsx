"use client";
import React from "react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useSetting } from "../setting/setting-context";
import { theme } from "@/theme";
import { CssBaseline } from "@mui/material";

export default function ThemProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setting = useSetting();
  const themeMode = theme(setting?.darkMode ? "light" : "dark");

  console.log(setting?.darkMode);
  console.log(themeMode);
  return (
    <MuiThemeProvider theme={themeMode}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
