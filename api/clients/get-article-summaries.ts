import { AxiosRequestConfig } from "axios";

import { ApiConfig, getHeaders } from "../api-config";
import {
  ArticleSummariesResponse,
  DefaultApiFp as ArticlesApi,
} from "../openapi/generated-clients/api-blog/api";

export const getSummaries = async (
  page = 1,
  limit = 10
): Promise<ArticleSummariesResponse | void> => {
  const options: AxiosRequestConfig = {
    params: {
      page,
      limit,
    },
    headers: getHeaders(),
  };
  const { apiConfig } = ApiConfig;
  try {
    const res = await ArticlesApi(apiConfig).articlesControllerFindAllSummaries(
      options
    );
    const data = (await res()).data;
    return data;
  } catch (error) {
    console.error("api error", error);
    return Promise.resolve();
  }
};
