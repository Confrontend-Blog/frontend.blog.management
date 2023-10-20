import { Configuration as ApiConfiguration } from "./openapi/generated-clients/api-blog";
import { DefaultApiFp as BlogApi } from "./openapi/generated-clients/api-blog/api";
import { DefaultApiFp as ImageApi } from "./openapi/generated-clients/api-image/api";
import { DefaultApiFp as UserApi } from "./openapi/generated-clients/api-user/api";

export const articlesEndpoint = "articles";
export const usersEndpoint = "users";
export const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

export const getCommonOptions = () => ({
  headers: { Accept: "application/json" },
  withCredentials: true,
});

const apiConfig = new ApiConfiguration({
  baseOptions: {
    credentials: "include",
  },
  basePath: baseUrl,
});

export const api = {
  ...UserApi(apiConfig),
  ...BlogApi(apiConfig),
  ...ImageApi(apiConfig),
};
