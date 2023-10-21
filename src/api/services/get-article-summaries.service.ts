import { AxiosRequestConfig } from "axios";

import { ApiResponse, getAllSummariesApiFacade } from "../facades/api-facade";
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

  return await getAllSummariesApiFacade(options);
};
