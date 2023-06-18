import { useLocation } from "react-router-dom";
import { Token } from "./client-token-storage";
import jwtDecode from "jwt-decode";

const useTokenFromUrl = (param: string): Token | null => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get(param);
  
  return token as Token;
};

export default useTokenFromUrl;