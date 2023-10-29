import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { DefaultTheme, ThemeProvider } from "styled-components";

import { AuthProvider, CurrentUser } from "../providers/auth-context";
import { theme } from "../styles/theme";

type TestProvidersProps = {
  isDark: boolean;
  children: ReactElement;
  user: CurrentUser | null;
};

const TestProviders = ({ isDark, children, user }: TestProvidersProps) => {
  return (
    <BrowserRouter>
      <AuthProvider user={user}>
        <ThemeProvider theme={theme(isDark) as DefaultTheme}>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  user = { id: "123", googleId: "Gid", displayName: "John Doe" },
  options = {}
) => {
  const isDark = false;
  return render(ui, {
    wrapper: (props) => (
      <TestProviders {...props} isDark={isDark} user={user} />
    ),
    ...options,
  });
};

export { customRender };
