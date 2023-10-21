import { Configuration as ApiConfiguration } from "./openapi/generated-clients/api-blog";
import {
  ArticleSummariesResponse,
  CreateArticleDto,
  DefaultApiAxiosParamCreator as ArticleAxiosApi,
} from "./openapi/generated-clients/api-blog/api";
import { DefaultApiAxiosParamCreator as ImageApi } from "./openapi/generated-clients/api-image/api";
import { UsersResponse } from "./openapi/generated-clients/api-user/api";
import { DefaultApiAxiosParamCreator as UserAxiosApi } from "./openapi/generated-clients/api-user/api";

export const articlesEndpoint = "articles";
export const usersEndpoint = "users";
export const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;
import { AxiosRequestConfig } from "axios";

import { HostedImageInfo } from "./clients/upload-image";
import { apiRequest } from "./utils/api-request.utils";

export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

const commonOptions = {
  headers: { Accept: "application/json" },
  withCredentials: true,
};

const apiConfig = new ApiConfiguration({
  baseOptions: {
    credentials: "include",
  },
  basePath: baseUrl,
});

const getAllUsersApi = async (
  params: AxiosRequestConfig
): Promise<ApiResponse<UsersResponse | null>> => {
  const { url } = await UserAxiosApi(apiConfig).usersControllerFindAll(
    commonOptions
  );

  return await apiRequest<UsersResponse>({
    url,
    ...params,
  });
};

const createArticleApi = async (
  params: CreateArticleDto
): Promise<ApiResponse<CreateArticleDto>> => {
  const { url } = await ArticleAxiosApi(apiConfig).articlesMgmtControllerCreate(
    params,
    commonOptions
  );

  return await apiRequest<CreateArticleDto>({
    method: "POST",
    url,
    data: params,
  });
};

const getAllSummariesApi = async (
  params: AxiosRequestConfig
): Promise<ApiResponse<ArticleSummariesResponse>> => {
  const { url } = await ArticleAxiosApi(
    apiConfig
  ).articlesControllerFindAllSummaries(commonOptions);

  return await apiRequest<ArticleSummariesResponse>({
    method: "GET",
    url,
    data: params,
  });
};

const uploadImageApi = async (
  params: any
): Promise<ApiResponse<HostedImageInfo>> => {
  const { url } = await ImageApi(apiConfig).imageControllerUpload(params);

  return await apiRequest<HostedImageInfo>({
    method: "POST",
    url,
    data: params,
  });
};

export { createArticleApi, getAllSummariesApi, getAllUsersApi, uploadImageApi };
