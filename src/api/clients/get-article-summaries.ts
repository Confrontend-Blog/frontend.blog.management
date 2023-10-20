import { AxiosRequestConfig } from "axios";

import { api, getCommonOptions } from "../api-config";
import { ArticleSummariesResponse } from "../openapi/generated-clients/api-blog/api";

export const getSummaries = async (
  page = 1,
  limit = 10
): Promise<ArticleSummariesResponse | void> => {
  const options: AxiosRequestConfig = {
    params: {
      page,
      limit,
    },
  };
  try {
    const res = await api.articlesControllerFindAllSummaries({
      ...options,
      ...getCommonOptions(),
    });
    const data = (await res()).data;
    return data;
  } catch (error) {
    console.error("api error", error);
    return Promise.resolve();
  }
};
