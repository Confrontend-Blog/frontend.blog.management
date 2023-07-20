import { getStoredToken } from "../src/utils/auth/client-token-storage";
import { Configuration as ApiConfiguration } from "./openapi/generated-clients/api-blog";

export const articlesEndpoint = "articles";
export const usersEndpoint = "users";

export const getHeaders = () => ({
  Accept: "application/json",
  Authorization: `Bearer ${getStoredToken("app-token")}`,
});

// Application wide api configs for auto-generated clients.
export const ApiConfig = {
  isJsonMime: function (mimeType: string | undefined | null): boolean {
    return Boolean(
      mimeType !== null && mimeType !== undefined && mimeType.includes("json")
    );
  },
  apiConfig: new ApiConfiguration({
    baseOptions: {
      withCredentials: false,
    },
    basePath: import.meta.env.VITE_BASE_URL,
  }),
};
