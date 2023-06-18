import { DefaultTheme, ThemeProvider } from "styled-components";
import "./styles/quill.snow.css";
import Layout from "./components/ui/layout/layout";
import { AppGlobalStyle } from "./styles/global.styled";
import { theme } from "./styles/theme";

import { AuthProvider } from "./components/auth/auth-conext";
import useTokenFromUrl from "./components/auth/use-token-from-url";
import { useMemo } from "react";
import { Token, getStoredToken } from "./components/auth/client-token-storage";
import { useThemeStore } from "./stores/themeStore";

function App() {
  const tokenFromUrl = useTokenFromUrl('access_token');
  const isDark = useThemeStore((state) => state.isDark);

  const token = useMemo(() => {
    console.log("Computing token value...");
    return tokenFromUrl || getStoredToken("access_token") as Token;
  }, [tokenFromUrl]);

  return (
    <AuthProvider initialAccessToken={token}>
      <ThemeProvider theme={theme(isDark) as DefaultTheme}>
        <AppGlobalStyle />
        <Layout />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
