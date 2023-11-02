import { Button } from "@Confrontend/ui-library";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../providers/auth-context";
import { RoutePaths } from "../../root-component";
import { getLocalStorage } from "../../utils/local-storage-util";
import { isObjectEmpty } from "../../utils/object-utils";
import * as S from "./login-page.styled";

// TODO consider token expiration
const LoginPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const storeUser = getLocalStorage("user");

  /** Do not render login page if already authenticated */
  if ((user && !isObjectEmpty(user)) || storeUser) {
    navigate(RoutePaths.Dashboard);
    return null;
  }

  const handleLogin = () => {
    const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_REDIRECT_URL
    }/api/v1/auth/google/redirect&response_type=code&scope=openid%20email%20profile`;

    window.location.href = authURL;
  };

  return (
    <S.PageWrapper>
      <span>
        <h1>You need to log in</h1>
        <Button onClick={handleLogin}>Login via Google</Button>
      </span>
    </S.PageWrapper>
  );
};

export default LoginPage;
