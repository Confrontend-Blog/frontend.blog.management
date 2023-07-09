import { Button } from "@Confrontend/ui-library";
import { Navigate } from "react-router-dom";

import { CLIENT_ID, environmentConfig } from "../../../api/api-config";
import { RoutePaths } from "../../root-component";
import * as S from "./login-page.styled";

const LoginPage = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const handleLogin = () => {
    console.log("login");

    const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${environmentConfig.baseUrl}/auth/google/redirect&response_type=code&scope=openid%20email%20profile`;
    window.location.href = authURL;
  };

  /** Do not render login page if already authenticated */
  if (isAuthenticated) {
    return <Navigate to={RoutePaths.Dashboard} replace />;
  }

  return (
    <S.PageWrapper>
      <span>
        <h1>You need to log in</h1>
        <Button bgColor="#555" onClick={handleLogin}>
          Login via Google{" "}
        </Button>
        <div>// TODO redirect to dashboard if logged in :)</div>
      </span>
    </S.PageWrapper>
  );
};

export default LoginPage;
