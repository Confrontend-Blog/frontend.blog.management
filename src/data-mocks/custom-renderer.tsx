import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

import { AuthProvider } from "../providers/auth-context";
import { theme } from "../styles/theme";

type TestProvidersProps = {
  isDark: boolean;
  children: ReactElement;
};

const TestProviders = ({ isDark, children }: TestProvidersProps) => {
  return (
    <AuthProvider
      user={{ id: "123", googleId: "Gid", displayName: "John Doe" }}
    >
      <ThemeProvider theme={theme(isDark) as DefaultTheme}>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

const customRender = (ui: ReactElement, options = {}) => {
  const isDark = false;
  return render(ui, {
    wrapper: (props) => <TestProviders {...props} isDark={isDark} />,
    ...options,
  });
};

export { customRender };
