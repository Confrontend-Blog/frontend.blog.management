import { useLocation } from "react-router-dom";

const useTokenFromUrl = (): string | null => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  return token;
};

export default useTokenFromUrl;
