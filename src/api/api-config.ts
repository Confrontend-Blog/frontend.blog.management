import { Configuration as ApiConfiguration } from "./openapi/generated-clients/api-blog";

export const articlesEndpoint = "articles";
export const usersEndpoint = "users";
export const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

export const getCommonOptions = () => ({
  headers: { Accept: "application/json" },
  withCredentials: true,
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
    basePath: baseUrl,
  }),
};