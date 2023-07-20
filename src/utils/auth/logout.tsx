import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../providers/auth-conext";
import { RoutePaths } from "../../root-component";
import { removeToken } from "./client-token-storage";

export const useLogout = () => {
  const { setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("handleLogout");
    removeToken("app-token");
    setAccessToken && setAccessToken(null);
    // FIXME logout redirects to dashboard
    navigate(RoutePaths.Login);
  };

  return handleLogout;
};
