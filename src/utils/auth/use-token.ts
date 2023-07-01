import { useMemo } from "react";

import { getStoredToken, Token } from "./client-token-storage";

export const useAccessToken = (): Token => {
  const token = useMemo(() => {
    console.log("Computing token value...");
    return getStoredToken("access_token") as Token;
  }, []);

  return token;
};
