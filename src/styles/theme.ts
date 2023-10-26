import { colors } from "@Confrontend/ui-library";
import { createTheme } from "@mui/material/styles";

const lightTheme = {
  palette: {
    action: {
      active: colors.grey[900],
      disabled: colors.grey[600],

      focus: colors.grey[600],

      hover: colors.blue[500],

      selected: colors.grey[900],
    },
    background: {
      default: colors.grey[900],
      paper: colors.white,
    },
    divider: colors.grey[600],
    error: { main: colors.red[500] },
    info: { main: colors.blue[500] },
    primary: { main: colors.grey[25] },
    secondary: { dark: colors.grey[200], main: colors.grey[900] },
    success: { main: colors.green[500] },
    text: {
      disabled: colors.grey[600],
      primary: colors.grey[900],
      secondary: colors.grey[200],
    },
    warning: { main: colors.orange[300] },
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
      paper: colors.grey[900],
    },
    text: {
      disabled: colors.grey[600],
      primary: colors.grey[200],
      secondary: colors.grey[900],
    },
  },
} as const;

export const theme = (isDark: boolean) => {
  return createTheme(isDark ? darkTheme : lightTheme);
};

export type CustomizedMuiThemeType = typeof lightTheme;
