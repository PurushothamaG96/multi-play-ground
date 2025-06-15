import { alpha } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

// ------------------------------------------------------------

export type ColorSchema =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

// Modern Greyscale
const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#E0E3E7",
  400: "#C2C7CF",
  500: "#9FA6B2",
  600: "#6B7280",
  700: "#4B5563",
  800: "#1F2937",
  900: "#111827",
};

// Modern Branding Colors
const PRIMARY = {
  lighter: "#E3F2FD",
  light: "#64B6F7",
  main: "#1976D2",
  dark: "#115293",
  darker: "#0B3C6D",
  contrastText: "#FFFFFF",
};

const SECONDARY = {
  lighter: "#F3E8FF",
  light: "#B980F0",
  main: "#7E3AF2",
  dark: "#5C2D91",
  darker: "#3B1C6F",
  contrastText: "#FFFFFF",
};

const INFO = {
  lighter: "#E0F7FA",
  light: "#4DD0E1",
  main: "#00ACC1",
  dark: "#007C91",
  darker: "#004D61",
  contrastText: "#FFFFFF",
};

const SUCCESS = {
  lighter: "#D1FAE5",
  light: "#6EE7B7",
  main: "#10B981",
  dark: "#047857",
  darker: "#065F46",
  contrastText: "#FFFFFF",
};

const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE066",
  main: "#F59E0B",
  dark: "#B45309",
  darker: "#78350F",
  contrastText: GREY[800],
};

const ERROR = {
  lighter: "#FFE6E6",
  light: "#FF8A80",
  main: "#E53935",
  dark: "#B71C1C",
  darker: "#7F0000",
  contrastText: "#FFFFFF",
};

const COMMON = {
  common: {
    black: "#000000",
    white: "#FFFFFF",
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.4),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export function palette(mode: PaletteMode) {
  const light = {
    ...COMMON,
    mode: "light" as PaletteMode,
    text: {
      primary: GREY[900],
      secondary: GREY[700],
      disabled: GREY[500],
    },
    background: {
      paper: "#FFFFFF",
      default: "#F9FAFB",
      neutral: GREY[200],
    },
    action: {
      ...COMMON.action,
      active: GREY[700],
    },
  };

  const dark = {
    ...COMMON,
    mode: "dark" as PaletteMode,
    text: {
      primary: "#FFFFFF",
      secondary: GREY[400],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.12),
    },
    action: {
      ...COMMON.action,
      active: GREY[400],
    },
  };

  return mode === "light" ? light : dark;
}
