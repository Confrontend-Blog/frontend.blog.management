import "./styles/quill.snow.css";

import { DefaultTheme, ThemeProvider } from "styled-components";

import Layout from "./components/ui/layout/layout";
import { AuthProvider } from "./providers/auth-conext";
import { useThemeStore } from "./stores/theme-store";
import { AppGlobalStyle } from "./styles/global.styled";
import { theme } from "./styles/theme";
import { useAccessToken } from "./utils/auth/use-token";

function App() {
  const isDark = useThemeStore((state) => state.isDark);
  const token = useAccessToken();

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
