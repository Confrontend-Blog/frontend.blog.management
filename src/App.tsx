import { DefaultTheme, ThemeProvider } from "styled-components";
import "./styles/quill.snow.css";
import Layout from "./components/ui/layout/layout";
import { AppGlobalStyle } from "./styles/global.styled";
import { theme } from "./styles/theme";

import { AuthProvider } from "./providers/auth-conext";
import useTokenFromUrl from "./utils/auth/token-utils";
import { useEffect, useMemo } from "react";
import { Token, getStoredToken } from "./utils/auth/client-token-storage";
import { useThemeStore } from "./stores/theme-store";
import { useUserStore } from "./stores/user-store";
import jwtDecode from "jwt-decode";

function App() {
  const { setLoggedInUser } = useUserStore();
  const tokenFromUrl = useTokenFromUrl("access_token");

  const isDark = useThemeStore((state) => state.isDark);

  const token = useMemo(() => {
    console.log("Computing token value...");
    return tokenFromUrl || (getStoredToken("access_token") as Token);
  }, [tokenFromUrl]);

  useEffect(() => {
    const decodedToken = jwtDecode(token || "") as { name: string };
    setLoggedInUser(decodedToken?.name || "User");
    console.log(decodedToken?.name);
    
  }, [token]);

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
