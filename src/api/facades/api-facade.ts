/**
 * API Facade Layer.
 *
 * Serves as an interface between the application and generated API clients.
 * Provides unified access to various API endpoints, abstracting request configurations
 * and error handling. Centralizes API interactions for maintainability and type safety.
 * It could be refactored into smaller facades if the module grows.
 *
 * @module api-facade
 */

import {
  ArticleDto,
  ArticleSummariesResponse,
  Configuration as ApiConfiguration,
  CreateArticleDto,
  DefaultApiAxiosParamCreator as ArticleAxiosApi,
} from "../openapi/generated-clients/api-articles";
import { DefaultApiAxiosParamCreator as ImageAxiosApi } from "../openapi/generated-clients/api-media";
import {
  DefaultApiAxiosParamCreator as UsersAxiosApi,
  UsersResponse,
} from "../openapi/generated-clients/api-users";

export const articlesEndpoint = "articles";
export const usersEndpoint = "users";
export const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;
import { AxiosRequestConfig } from "axios";

import { HostedImageInfo } from "../services/upload-image.service";
import { apiRequest } from "../utils/api-request.utils";

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

const getAllUsersApiFacade = async (
  params: AxiosRequestConfig
): Promise<ApiResponse<UsersResponse | null>> => {
  const { url } = await UsersAxiosApi(apiConfig).usersControllerFindAll(
    commonOptions
  );

  console.log("urlurlurlurl", url);

  return await apiRequest<UsersResponse>({
    url,
    ...params,
  });
};

const createArticleApiFacade = async (
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

const getAllSummariesApiFacade = async (
  params: AxiosRequestConfig
): Promise<ApiResponse<ArticleSummariesResponse>> => {
  const { url } = await ArticleAxiosApi(
    apiConfig
  ).summariesControllerFindAllSummaries(commonOptions);

  return await apiRequest<ArticleSummariesResponse>({
    method: "GET",
    url,
    data: params,
  });
};

const uploadImageApiFacade = async (
  params: any
): Promise<ApiResponse<HostedImageInfo>> => {
  const { url } = await ImageAxiosApi(apiConfig).imageControllerUpload(params);

  return await apiRequest<HostedImageInfo>({
    method: "POST",
    url,
    data: params,
  });
};

const getArticleFacade = async (
  params: string
): Promise<ApiResponse<ArticleDto>> => {
  const { url } = await ArticleAxiosApi(apiConfig).articlesControllerFindOne(
    params
  );

  return await apiRequest<ArticleDto>({
    method: "GET",
    url,
    data: params,
  });
};

export {
  createArticleApiFacade,
  getAllSummariesApiFacade,
  getAllUsersApiFacade,
  getArticleFacade,
  uploadImageApiFacade,
};
