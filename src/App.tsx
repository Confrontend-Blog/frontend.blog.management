import { DefaultTheme, ThemeProvider } from "styled-components";
import "./App.css";
import Layout from "./components/ui/layout/layout";
import { AppGlobalStyle } from "./styles/global.styled";
import { theme } from "./styles/theme";
import "./styles/quill.snow.css";

import { Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./components/auth/auth-conext";
import useTokenFromUrl from "./components/auth/use-token-from-url";
import { useMemo } from "react";
import { getStoredToken } from "./components/auth/client-token-storage";
type AppProps = {
  initialToken: string | null;
};

function App() {
  const tokenFromUrl = useTokenFromUrl();
  const token = useMemo(() => {
    console.log("Computing token value...");
    return tokenFromUrl || getStoredToken();
  }, [tokenFromUrl]);

  return (
    <AuthProvider initialToken={token}>
      <ThemeProvider theme={theme as DefaultTheme}>
        <AppGlobalStyle />
        <Layout />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
