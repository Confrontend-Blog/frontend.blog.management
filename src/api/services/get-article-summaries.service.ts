import { AxiosRequestConfig } from "axios";

import { ApiResponse, getAllSummariesApi } from "../api-facade";
import { ArticleSummariesResponse } from "../openapi/generated-clients/api-blog/api";

export const getSummaries = async (
  page = 1,
  limit = 10
): Promise<ApiResponse<ArticleSummariesResponse>> => {
  const options: AxiosRequestConfig = {
    params: {
      page,
      limit,
    },
  };

  return await getAllSummariesApi(options);
};
