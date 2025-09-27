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

      h1: {
        fontSize: "3rem", // 48px
        fontWeight: 700,
        lineHeight: 1.167,
        letterSpacing: "-0.01562em",
      },
      h2: {
        fontSize: "2.25rem", // 36px
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "-0.00833em",
      },
      h3: {
        fontSize: "1.75rem", // 28px
        fontWeight: 700,
        lineHeight: 1.167,
        letterSpacing: "0em",
      },
      h4: {
        fontSize: "1.5rem", // 24px
        fontWeight: 700,
        lineHeight: 1.235,
        letterSpacing: "0.00735em",
      },
      h5: {
        fontSize: "1.25rem", // 20px
        fontWeight: 700,
        lineHeight: 1.334,
        letterSpacing: "0em",
      },
      h6: {
        fontSize: "1rem", // 16px
        fontWeight: 700,
        lineHeight: 1.6,
        letterSpacing: "0.0075em",
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.75,
        letterSpacing: "0.00938em",
      },
      subtitle2: {
        fontSize: "0.875rem", // 14px
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: "0.00714em",
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
      body2: {
        fontSize: "0.875rem", // 14px
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: "0.01071em",
      },
      button: {
        fontSize: "0.875rem",
        fontWeight: 700,
        lineHeight: 1.75,
        letterSpacing: "0.02857em",
        textTransform: "uppercase",
      },
      caption: {
        fontSize: "0.75rem", // 12px
        fontWeight: 400,
        lineHeight: 1.66,
        letterSpacing: "0.03333em",
      },
      overline: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 2.66,
        letterSpacing: "0.08333em",
        textTransform: "uppercase",
      },
    },
  });
};
