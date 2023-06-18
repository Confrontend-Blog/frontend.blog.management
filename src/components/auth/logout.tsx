import { useContext } from "react";
import AuthContext from "./auth-conext";
import { removeToken } from "./client-token-storage";

export const useLogout = () => {
  const { setToken } = useContext(AuthContext);

  const handleLogout = () => {
    removeToken("access_token");
    setToken(null);
  };

  return handleLogout;
};
