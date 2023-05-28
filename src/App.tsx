import { DefaultTheme, ThemeProvider } from "styled-components";
// import "./App.css";
// import "./styles/quill.snow.css";
import Layout from "./components/ui/layout/layout";
import { AppGlobalStyle } from "./styles/global.styled";
import { theme } from "./styles/theme";

import { AuthProvider } from "./components/auth/auth-conext";
import useTokenFromUrl from "./components/auth/use-token-from-url";
import { useMemo } from "react";
import { getStoredToken } from "./components/auth/client-token-storage";

function App() {
  const tokenFromUrl = useTokenFromUrl();
  const token = useMemo(() => {
    console.log("Computing token value...");
    return tokenFromUrl || getStoredToken('firebase_token');
  }, [tokenFromUrl]);

  return (
    <AuthProvider initialFirebaseToken={token}>
      <ThemeProvider theme={theme as DefaultTheme}>
        <AppGlobalStyle />
        <Layout />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
