import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { palette as getPalette } from "./palette";
import type { PaletteMode } from "@mui/material";

const roboto = Roboto({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = (mode: PaletteMode = "dark") => {
  return createTheme({
    palette: getPalette(mode),
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
  });
};
