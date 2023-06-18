import { createContext, ReactNode } from "react";
import { storeToken, Token } from "../utils/auth/client-token-storage";
import jwtDecode from "jwt-decode";

interface AuthContextValue {
  username: string;
  accessToken: string;
  firebaseToken: string;
  setAccessToken: (value: string | null) => void;
}

const AuthContext = createContext<AuthContextValue>({
  username: "",
  accessToken: "",
  firebaseToken: "",
  setAccessToken: () => null,
});

interface AuthProviderProps {
  auth: AuthContextValue | null;
  children: ReactNode;
}

export const AuthProvider = ({ auth, children }: AuthProviderProps) => {
  let username = "";

  if (auth?.accessToken) {
    // Store token in local storage
    storeToken(auth?.accessToken);
    const decodedToken = jwtDecode(auth?.accessToken || "") as { name: string };
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
    accessToken: auth?.accessToken || "",
    firebaseToken: "",
    setAccessToken: () => null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
