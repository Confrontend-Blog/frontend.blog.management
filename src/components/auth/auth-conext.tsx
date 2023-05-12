import { createContext, ReactNode, useState } from "react";
import { storeToken } from "./client-token-storage";

interface AuthContextValue {
  token: string | null;
  setToken?: (value: string | null) => void;
}

const AuthContext = createContext<AuthContextValue>({
  token: null,
  setToken: () => null,
});

interface AuthProviderProps {
  initialToken: string | null;
  children: ReactNode;
}

export const AuthProvider = ({ children, initialToken }: AuthProviderProps) => {
  if (initialToken) {
    // Store token in local storage
    storeToken(initialToken);
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
    token: initialToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
