import { createContext, ReactNode } from "react";
import { storeToken, Token } from "../utils/auth/client-token-storage";

interface AuthContextValue {
  token: Token | null;
  setToken: (value: string | null) => void;
}

const AuthContext = createContext<AuthContextValue>({
  token: null,
  setToken: () => null,
});

interface AuthProviderProps {
  initialAccessToken: Token | null;
  children: ReactNode;
}

export const AuthProvider = ({
  children,
  initialAccessToken,
}: AuthProviderProps) => {
  if (initialAccessToken) {
    // Store token in local storage
    storeToken(initialAccessToken);
  }

  // TODO: add logic for silent token renewal
  // const refreshToken = (value: string | null) => {
  //   if (value) {
  //     // Store token in local storage
  //     storeToken(value);
  //   }
  //   setTokenState(value);
  // };

  const value: AuthContextValue = {
    token: initialAccessToken,
    setToken: () => null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
