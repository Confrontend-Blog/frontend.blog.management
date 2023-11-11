import { UserDto } from "../../api/openapi/generated-clients/api-users";
import { useSyncedLocalStorage } from "../local-storage-util";
import useParamFromUrl from "../url-utils";

export const useAuthenticate = () => {
  const [storedValue, setStorage] = useSyncedLocalStorage<UserDto | null>(
    "user",
    null
  );
  const paramUser = useParamFromUrl("userInfo");

  if (import.meta.env.VITE_ENVIRONMENT === "test") {
    const testUser = {
      id: "123",
      googleId: "googleID",
      displayName: "Dummy User",
      active: true,
      email: "test@test.test",
    };
    setStorage(testUser);
    return testUser;
  }

  console.log("storedValue", storedValue);
  // Already logged in
  if (storedValue) {
    return storedValue;
  }

  const parsedParamUser = paramUser ? JSON.parse(paramUser) : {};

  // Only update local storage and context if parsedParamUser is not empty
  if (Object.keys(parsedParamUser).length > 0) {
    setStorage(parsedParamUser);
  }

  return parsedParamUser;
};
