import { alpha } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

const GREY = {
  0: "#FFFFFF",
  100: "#FAFAF9",
  200: "#F4F4F5",
  300: "#E4E4E7",
  400: "#D4D4D8",
  500: "#A1A1AA",
  600: "#71717A",
  700: "#52525B",
  800: "#27272A",
  900: "#18181B",
};

// 🌼 Yellow as Primary
const PRIMARY = {
  lighter: "#FFFDE7",
  light: "#FFF176",
  main: "#FACC15", // Vibrant Yellow
  dark: "#CA8A04", // Mustard-ish
  darker: "#A16207",
  contrastText: GREY[900],
};

// Secondary (Deep Grey/Charcoal to balance yellow)
const SECONDARY = {
  lighter: "#F3F4F6",
  light: "#9CA3AF",
  main: "#374151", // Charcoal
  dark: "#1F2937",
  darker: "#111827",
  contrastText: "#FFFFFF",
};

const INFO = {
  lighter: "#E0F2FE",
  light: "#60A5FA",
  main: "#3B82F6",
  dark: "#1D4ED8",
  darker: "#1E3A8A",
  contrastText: "#FFFFFF",
};

const SUCCESS = {
  lighter: "#ECFDF5",
  light: "#34D399",
  main: "#10B981",
  dark: "#047857",
  darker: "#064E3B",
  contrastText: "#FFFFFF",
};

const WARNING = {
  lighter: "#FEF9C3",
  light: "#FDE047",
  main: "#FACC15", // matches primary
  dark: "#CA8A04",
  darker: "#A16207",
  contrastText: GREY[900],
};

const ERROR = {
  lighter: "#FEF2F2",
  light: "#FCA5A5",
  main: "#DC2626",
  dark: "#B91C1C",
  darker: "#7F1D1D",
  contrastText: "#FFFFFF",
};

const COMMON = {
  common: { black: "#000", white: "#FFF" },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.2),
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
      default: "#FFFBEB", // soft pale yellow background
      neutral: GREY[200],
    },
    action: { ...COMMON.action, active: GREY[700] },
  };

  const dark = {
    ...COMMON,
    mode: "dark" as PaletteMode,
    text: {
      primary: "#FAFAF9",
      secondary: GREY[400],
      disabled: GREY[600],
    },
    background: {
      paper: "#1C1917",
      default: "#0F0F0F",
      neutral: alpha(GREY[500], 0.12),
    },
    action: { ...COMMON.action, active: GREY[400] },
  };

  return mode === "light" ? light : dark;
}
