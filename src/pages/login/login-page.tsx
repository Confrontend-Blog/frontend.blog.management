import CuiButton from "../../components/ui/button/cui-button";
import * as S from "./login-page.styled";
const CLIENT_ID =
  "949870185516-6ht2coid8u4adoslg7bbcok8bf1j27r4.apps.googleusercontent.com"; // Replace with your Google Client ID
const REDIRECT_URI = "http://localhost:8080/auth/google/redirect"; // Replace with your backend redirect URI

const LoginPage = () => {
  const handleLogin = () => {
    const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
    window.location.href = authURL;
  };

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
