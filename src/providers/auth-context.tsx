import { createContext, ReactNode } from "react";

import { UserDto } from "../api/openapi/generated-clients/api-user";

export type CurrentUser = Omit<UserDto, "email" | "active">;

interface AuthContextValue {
  user: CurrentUser | null;
  firebaseToken?: string;
}

interface AuthProviderProps {
  user: CurrentUser | null;
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
});

export const AuthProvider = ({ user, children }: AuthProviderProps) => {
  // TODO firebase

  const value: AuthContextValue = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
