import { useNavigate } from "react-router-dom";

import { RoutePaths } from "../../root-component";
import { removeLocalStorage } from "../local-storage-util";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("handleLogout");
    removeLocalStorage("user");

    navigate(RoutePaths.Login);
  };

  return handleLogout;
};
