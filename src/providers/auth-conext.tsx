import jwtDecode from "jwt-decode";
import { createContext, ReactNode, useState } from "react";

interface AuthContextValue {
  username?: string;
  accessToken: string | null;
  firebaseToken?: string;
  setAccessToken?: (value: string | null) => void;

  setIsAuthenticated?: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextValue>({
  username: "",
  accessToken: "",
  firebaseToken: "",
  setAccessToken: () => null,
  setIsAuthenticated: () => null,
});

interface AuthProviderProps {
  children: ReactNode;
  accessToken: string | null;
}

export const AuthProvider = ({ children, accessToken }: AuthProviderProps) => {
  let username = "";

  if (accessToken) {
    // FIXME
    const decodedToken = jwtDecode(accessToken || "") as { name: string };

    username = decodedToken?.name || "User";
  }

  // TODO: add logic for silent token renewal
  // const refreshToken = (value: string | null) => {
  //   if (value) {
  //     // Store token in local storage
  //     storeToken(value);
  //   }
  //   setTokenState(value);
  // };

  const setAccessToken = (value: string | null) => {
    console.log("setAccessToken", value);
    // TODO improve prop overriding
    accessToken = value;
  };

  const value: AuthContextValue = {
    username,
    accessToken: accessToken || "",
    // TODO firebaseToken
    firebaseToken: "",
    setAccessToken,
    setIsAuthenticated: () => null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
