import { useMemo } from "react";

import { getStoredToken, Token } from "./client-token-storage";

export const useAccessToken = (): Token => {
  const token = useMemo(() => {
    console.log("Computing token value...");
    return getStoredToken("app-token") as Token;
  }, []);

  return token;
};
