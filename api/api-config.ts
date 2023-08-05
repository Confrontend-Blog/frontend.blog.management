import { Configuration as ApiConfiguration } from "./openapi/generated-clients/api-blog";

export const articlesEndpoint = "articles";
export const usersEndpoint = "users";

export const getHeaders = () => ({
  Accept: "application/json",
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
      credentials: "include",
    },
    basePath: `${import.meta.env.VITE_BASE_URL}/api`,
  }),
};
