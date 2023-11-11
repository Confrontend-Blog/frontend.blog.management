import { createContext, ReactNode, useState } from "react";

import { UserDto } from "../api/openapi/generated-clients/api-users";
import { useAuthenticate } from "../utils/auth/useAuthenticate";
import { useSyncedLocalStorage } from "../utils/local-storage-util";

export type CurrentUser = Omit<UserDto, "email" | "active">;

interface AuthContextValue {
  user: CurrentUser | null;
  setUser: (user: CurrentUser | null) => void;
  firebaseToken?: string;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => null,
  logout: () => null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const initialUser = useAuthenticate();
  const [user, setUser] = useState<CurrentUser | null>(initialUser);
  const [, , removeStorage] = useSyncedLocalStorage<UserDto | null>(
    "user",
    null
  );

  const logout = () => {
    setUser(null);
    removeStorage();
  };

  // TODO firebase

  const value: AuthContextValue = {
    user,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
