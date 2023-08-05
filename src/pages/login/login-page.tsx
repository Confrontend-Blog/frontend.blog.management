import { Button } from "@Confrontend/ui-library";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../../providers/auth-conext";
import { RoutePaths } from "../../root-component";
import { getLocalStorage } from "../../utils/local-storage-util";
import { isObjectEmpty } from "../../utils/object-utils";
import * as S from "./login-page.styled";

// TODO consider token expiration
const LoginPage = () => {
  const { user } = useContext(AuthContext);
  const storeUser = getLocalStorage("user");

  /** Do not render login page if already authenticated */
  if ((user && !isObjectEmpty(user)) || storeUser) {
    return <Navigate to={RoutePaths.Dashboard} replace />;
  }

  const handleLogin = () => {
    const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      import.meta.env.VITE_CLIENT_ID
      // TODO dynamic backend url
    }&redirect_uri=http://localhost:8080/api/auth/google/redirect&response_type=code&scope=openid%20email%20profile`;

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
