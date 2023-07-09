import { useEffect, useState } from "react";

import { environmentConfig } from "../../../api/api-config";
import useParamFromUrl from "../url-utils";
import { storeToken } from "./client-token-storage";

export const useAuthenticate = () => {
  console.log("useAuthenticate");

  const userInfo = useParamFromUrl("userInfo");
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await fetch(
          `${environmentConfig.baseUrl}/auth/authenticate`,
          {
            method: "POST",
            body: JSON.stringify({ userInfo }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        const token = data.accessToken;
        if (token) {
          storeToken(token);
          setAccessToken(token);
        }
      } catch (error) {
        console.error("Login failed", error);
      } finally {
        setIsLoading(false);
      }
    };
    authenticate();
  }, [userInfo]);

  return { accessToken, isLoading };
};
