import "jest-styled-components";

import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

import { AuthProvider } from "../src/providers/auth-conext";
import { theme } from "../src/styles/theme";

jest.mock('jwt-decode', () => jest.fn(() => ({ name: 'Mock Name' })));

type TestProvidersProps = {
  token: string;
  isDark: boolean;
  children: ReactElement;
};

const TestProviders = ({ token, isDark, children }: TestProvidersProps) => {
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
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
};

const customRender = (ui: ReactElement, options = {}) => {
  const token = "token";
  const isDark = false;
  return render(ui, {
    wrapper: (props) => (
      <TestProviders {...props} token={token} isDark={isDark} />
    ),
    ...options,
  });
};

export { customRender };
