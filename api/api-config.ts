import { getStoredToken } from "../src/utils/auth/client-token-storage";
import { Configuration as ApiConfiguration } from "./openapi/generated-clients/api-blog";

export const CLIENT_ID =
  "949870185516-6ht2coid8u4adoslg7bbcok8bf1j27r4.apps.googleusercontent.com";

const localhost = {
  baseUrl: "http://localhost:8080",
};

// GCP Cloud Run development instance url
const development = {
  baseUrl: "https://article-service-dev-c5zdjekmoq-ey.a.run.app",
  // baseUrl: "http://localhost:8080",
};

/**
 * https://article-service-dev-c5zdjekmoq-ey.a.run.app/auth/google/redirect?code=4%2F0AZEOvhXREWafQJCd3P6wlL4iVQQCdA1w1pFEsiNyAcvOc9WB7tI-jbNvqb1xdpaN3DPGJQ&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&authuser=1&prompt=none
 */

const production = {
  baseUrl: "TODO",
};

// For now switch between localhost and development, add prod later
export const environmentConfig =
  import.meta.env.VITE_ENVIRONMENT === "development" ? development : localhost;

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
    basePath: environmentConfig.baseUrl,
  }),
};
