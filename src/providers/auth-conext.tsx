import { createContext, ReactNode } from "react";

import { UserDto } from "../../api/openapi/generated-clients/api-user";

interface AuthContextValue {
  user: UserDto | null;
  firebaseToken?: string;
}

interface AuthProviderProps {
  user: UserDto | null;
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
