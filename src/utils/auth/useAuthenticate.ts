import { UserDto } from "../../api/openapi/generated-clients/api-users";
import { useSyncedLocalStorage } from "../local-storage/useSyncedLocalStorage";
import useParamFromUrl from "../url-utils";

/**
 * Custom hook for handling user authentication in a React application.
 * It checks for user information in local storage and URL parameters,
 * and sets the user state accordingly. This hook is primarily used
 * for initializing user state on application startup or when the relevant
 * URL parameters are present.
 *
 * In test environments, it sets a predefined test user.
 *
 * @returns {UserDto | null | object} The authenticated user's data if available,
 *          or an object parsed from URL parameters, or `null` if neither is available.
 */
export const useAuthenticate = (): UserDto | null => {
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

  // Already logged in
  if (storedValue) {
    return storedValue;
  }

  const parsedParamUser: UserDto = paramUser ? JSON.parse(paramUser) : {};

  // Only update local storage and context if parsedParamUser is not empty
  if (Object.keys(parsedParamUser).length > 0) {
    setStorage(parsedParamUser);
  }

  return parsedParamUser;
};
