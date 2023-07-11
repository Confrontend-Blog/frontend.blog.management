import "./styles/quill.snow.css";

import { DefaultTheme, ThemeProvider } from "styled-components";

import Layout from "./components/ui/layout/layout";
import { AuthProvider } from "./providers/auth-conext";
import { useThemeStore } from "./stores/theme-store";
import { AppGlobalStyle } from "./styles/global.styled";
import { theme } from "./styles/theme";

function App() {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <ThemeProvider theme={theme(isDark) as DefaultTheme}>
      <AppGlobalStyle />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
