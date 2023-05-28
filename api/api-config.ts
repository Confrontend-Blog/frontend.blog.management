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
      },
    },
    basePath: environmentConfig.baseUrl,
  }),
};
