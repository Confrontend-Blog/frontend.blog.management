import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../providers/auth-context";
import { RoutePaths } from "../../root-component";

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return () => {
    logout();
    navigate(RoutePaths.Login);
  };
};
