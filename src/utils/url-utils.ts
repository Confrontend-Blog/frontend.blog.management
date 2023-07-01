import { useLocation } from "react-router-dom";

import { Token } from "./auth/client-token-storage";

const useParamFromUrl = (param: string): Token | null => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get(param);

  return token as Token;
};

export default useParamFromUrl;
