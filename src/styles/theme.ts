import { createTheme } from "@mui/material/styles";

export const colors = {
  blueMedium: "#2196f3",
  greenMedium: "#4caf50",
  greyDark: "#202124",
  greyLight: "#ccc",
  greyMedium: "#666",
  greyVeryLight: "#F2F2F2",
  orangeLight: "#ffb74d",
  redMedium: "#d32f2f",
  white: "#fff",
};

const lightTheme = {
  palette: {
    action: {
      active: colors.greyDark,
      disabled: colors.greyMedium,

      focus: colors.greyDark,

      hover: colors.blueMedium,

      selected: colors.greyDark,
    },
    background: {
      default: colors.greyDark,
      paper: colors.white,
    },
    divider: colors.greyMedium,
    error: { main: colors.redMedium },
    info: { main: colors.blueMedium },
    primary: { main: colors.greyVeryLight },
    secondary: { dark: colors.greyLight, main: colors.greyDark },
    success: { main: colors.greenMedium },
    text: {
      disabled: colors.greyMedium,
      primary: colors.greyDark,
      secondary: colors.greyLight,
    },
    warning: { main: colors.orangeLight },
  },
  typography: {
    // body1 is typically used for longer text elements, such as paragraphs or articles,
    body1: {
      fontSize: "1rem",
      lineHeight: 1.75,
    },
    // body2 is used for shorter text elements, such as captions or subheaders.
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
    button: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
      textTransform: "capitalize",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.66,
    },
    fontFamily: "Futura, Roboto, sans-serif",
    h1: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.2rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: "0.8rem",
      fontWeight: 250,
    },
  },
} as const;

const darkTheme = {
  ...lightTheme,
  palette: {
    background: {
      default: colors.white,
      paper: colors.greyDark,
    },
    text: {
      disabled: colors.greyMedium,
      primary: colors.greyLight,
      secondary: colors.greyDark,
    },
  },
} as const;

export const theme = (isDark: boolean) => {
  return createTheme(isDark ? darkTheme : lightTheme);
};

export type CustomizedMuiThemeType = typeof lightTheme;
