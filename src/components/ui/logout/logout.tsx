import { useContext } from "react";

import AuthContext from "../../../providers/auth-conext";
import { removeToken } from "../../../utils/auth/client-token-storage";

export const useLogout = () => {
  const { setAccessToken } = useContext(AuthContext);

  const handleLogout = () => {
    removeToken("access_token");
    setAccessToken && setAccessToken(null);
  };

  return handleLogout;
};
