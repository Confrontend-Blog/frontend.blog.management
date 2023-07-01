import jwtDecode from "jwt-decode";
import { createContext, ReactNode } from "react";

import { useAccessToken } from "../utils/auth/use-token";

interface AuthContextValue {
  username?: string;
  accessToken: string;
  firebaseToken?: string;
  setAccessToken?: (value: string | null) => void;
}

const AuthContext = createContext<AuthContextValue>({
  username: "",
  accessToken: "",
  firebaseToken: "",
  setAccessToken: () => null,
});

interface AuthProviderProps {
  children: ReactNode;
  accessToken: string;
}

export const AuthProvider = ({ children, accessToken }: AuthProviderProps) => {
  let username = "";

  if (accessToken) {
    console.log(accessToken);
    // FIXME
    const decodedToken = jwtDecode(accessToken || "") as { name: string };
    console.log("decodedToken", decodedToken);

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

  const value: AuthContextValue = {
    username,
    accessToken: accessToken || "",
    // TODO
    firebaseToken: "",
    setAccessToken: () => null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
