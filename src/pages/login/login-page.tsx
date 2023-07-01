import { Navigate } from "react-router-dom";

import { BASE_URI, CLIENT_ID } from "../../../api/api-config";
import CuiButton from "../../components/ui/button/cui-button";
import { RoutePaths } from "../../root-component";
import * as S from "./login-page.styled";

const LoginPage = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const handleLogin = () => {
    const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${BASE_URI}/auth/google/redirect&response_type=code&scope=openid%20email%20profile`;
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
        <CuiButton bgColor="#555" onClick={handleLogin}>
          Login via Google{" "}
        </CuiButton>
        <div>// TODO redirect to dashboard if logged in :)</div>
      </span>
    </S.PageWrapper>
  );
};

export default LoginPage;
