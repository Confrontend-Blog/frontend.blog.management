import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { vi } from "vitest";

import { AuthProvider } from "../providers/auth-conext";
import { theme } from "../styles/theme";

vi.mock("jwt-decode", () => vi.fn(() => ({ name: "Mock Name" })));

type TestProvidersProps = {
  isDark: boolean;
  children: ReactElement;
};

const TestProviders = ({ isDark, children }: TestProvidersProps) => {
  return (
    <AuthProvider user={{ id: 123, googleId: "Gid", displayName: "John Doe" }}>
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
