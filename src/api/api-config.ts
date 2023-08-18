import { Configuration as ApiConfiguration } from "./openapi/generated-clients/api-blog";

export const articlesEndpoint = "articles";
export const usersEndpoint = "users";
export const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api`;
export const baseUrlMgmt = `${import.meta.env.VITE_BACKEND_URL}/api/mgmt`;

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
  apiConfig: (management = false) =>
    new ApiConfiguration({
      baseOptions: {
        credentials: "include",
      },
      basePath: management ? baseUrlMgmt : baseUrl,
    }),
};
