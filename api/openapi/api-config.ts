import { Configuration as ApiConfiguration } from "./generated-clients";

const developmentConfig = {
  baseUrl: "http://localhost:8080",
};

const productionConfig = {
  baseUrl: "TODO",
};

const environmentConfig =
  process.env.NODE_ENV === "development" ? developmentConfig : productionConfig;

export const articlesEndpoint = "articles";

export const ApiConfig = {
  // Application wide api configs for auto-generated clients.
  apiConfig: new ApiConfiguration({
    baseOptions: {
      headers: {
        Accept: "application/json",
      },
    },
    basePath: environmentConfig.baseUrl,
  }),
};
