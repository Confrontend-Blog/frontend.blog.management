import { useLocation } from "react-router-dom";

import { Token } from "./auth/client-token-storage";

const useParamFromUrl = (param: string): Token | null => {
  const location = useLocation();
  console.log(location);
  
  const searchParams = new URLSearchParams(location.search);
  console.log(searchParams);

  const token = searchParams.get(param);

  return token as Token;
};

export default useParamFromUrl;
