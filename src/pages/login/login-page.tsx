// LoginPage.tsx
import CuiButton from "../../components/ui/button/cui-button";

const CLIENT_ID =
  "949870185516-6ht2coid8u4adoslg7bbcok8bf1j27r4.apps.googleusercontent.com"; // Replace with your Google Client ID
const REDIRECT_URI = "http://localhost:8080/auth/google/redirect"; // Replace with your backend redirect URI

const LoginPage = () => {
  const handleLogin = () => {
    const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
    window.location.href = authURL;
  };

  return (
    <div>
      <h1>You need to log in</h1>
      <CuiButton bgColor="#555" onClick={handleLogin}> Login via Google </CuiButton>
    </div>
  );
};

export default LoginPage;
