import { getStoredToken } from "../src/components/auth/client-token-storage";
import { Configuration as ApiConfiguration } from "./openapi/generated-clients/api-blog";

const developmentConfig = {
  baseUrl: "http://localhost:8080",
};

const productionConfig = {
  baseUrl: "TODO",
};

const environmentConfig =
  process.env.NODE_ENV === "development" ? developmentConfig : productionConfig;

export const articlesEndpoint = "articles";
export const usersEndpoint = "users";

// Application wide api configs for auto-generated clients.
export const ApiConfig = {
  isJsonMime: function (mimeType: string | undefined | null): boolean {
    return Boolean(
      mimeType !== null && mimeType !== undefined && mimeType.includes("json")
    );
  },

  apiConfig: new ApiConfiguration({
    baseOptions: {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getStoredToken()}`,
      },
    },
    basePath: environmentConfig.baseUrl,
  }),
};
