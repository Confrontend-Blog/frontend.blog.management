import { getLocalStorage, setLocalStorage } from "../local-storage-util";
import useParamFromUrl from "../url-utils";

export const useAuthenticate = () => {
  const storeUser = getLocalStorage("user");
  const paramUser = useParamFromUrl("userInfo");

  console.log(import.meta.env.VITE_ENVIRONMENT);

  if (import.meta.env.VITE_ENVIRONMENT === "test") {
    const testUser = {
      id: 123,
      googleId: "googleID",
      displayName: "Dummy User",
    };
    setLocalStorage({ key: "user", value: testUser });
    return testUser;
  }

  console.log(storeUser);

  // Already logged in
  if (storeUser) {
    return storeUser;
  }

  const parsedParamUser = paramUser ? JSON.parse(paramUser) : {};

  // Only update local storage and context if parsedParamUser is not empty
  if (Object.keys(parsedParamUser).length > 0) {
    setLocalStorage({ key: "user", value: parsedParamUser });
  }

  return parsedParamUser;
};
