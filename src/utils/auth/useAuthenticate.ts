import { useContext, useEffect, useState } from "react";

import AuthContext from "../../providers/auth-conext";
import useParamFromUrl from "../url-utils";
import {
  getStoredToken,
  removeToken,
  storeToken,
} from "./client-token-storage";

export const useAuthenticate = () => {
  const userInfo = useParamFromUrl("userInfo");

  const { setAccessToken } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // TODO find a better solution
  const isLoggedOut = !getStoredToken("app-token");

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/auth/app-token`,
          {
            method: "POST",
            body: JSON.stringify({ userInfo }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const firebase = await fetch(
          `${import.meta.env.VITE_BASE_URL}/auth/chat-token`,
          {
            method: "POST",
            body: JSON.stringify({ userInfo }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // TODO remove me
        const d = await firebase.json();
        console.log(d, "<........ firebase");

        const data = await response.json();
        const token = data.accessToken;
        if (token) {
          console.log({ token });

          storeToken(token);
          setToken(token);
          setAccessToken && setAccessToken(token);
        } else {
          removeToken("app-token");
        }
      } catch (error) {
        console.error("Login failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, []);

  return isLoggedOut ? { token: null, isLoading: false } : { token, isLoading };
};
