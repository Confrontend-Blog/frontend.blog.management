import { useMemo } from "react";

import { getStoredToken, Token } from "./client-token-storage";
import useTokenFromUrl from "./token-utils";

export const useAccessToken = (): Token => {
  const tokenFromUrl = useTokenFromUrl("access_token");
  const token = useMemo(() => {
    console.log("Computing token value...");
    return tokenFromUrl || (getStoredToken("access_token") as Token);
  }, [tokenFromUrl]);

  return token;
};
