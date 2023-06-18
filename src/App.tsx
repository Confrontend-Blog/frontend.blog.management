import "./styles/quill.snow.css";

import { useMemo } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

import Layout from "./components/ui/layout/layout";
import { AuthProvider } from "./providers/auth-conext";
import { useThemeStore } from "./stores/theme-store";
import { AppGlobalStyle } from "./styles/global.styled";
import { theme } from "./styles/theme";
import { getStoredToken,Token } from "./utils/auth/client-token-storage";
import useTokenFromUrl from "./utils/auth/token-utils";

function App() {
  const tokenFromUrl = useTokenFromUrl("access_token");

  const isDark = useThemeStore((state) => state.isDark);

  const token = useMemo(() => {
    console.log("Computing token value...");
    return tokenFromUrl || (getStoredToken("access_token") as Token);
  }, [tokenFromUrl]);

  return (
    <AuthProvider
      auth={{
        username: "",
        accessToken: token,
        firebaseToken: "",
        setAccessToken: () => null,
      }}
    >
      <ThemeProvider theme={theme(isDark) as DefaultTheme}>
        <AppGlobalStyle />
        <Layout />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
