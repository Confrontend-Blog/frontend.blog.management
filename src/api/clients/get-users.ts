import { AxiosRequestConfig } from "axios";

import { ApiConfig, getCommonOptions } from "../api-config";
import {
  DefaultApiFp as UsersApi,
  UsersResponse,
} from "../openapi/generated-clients/api-user/api";

export const getUsers = async (
  page = 1,
  limit = 10
): Promise<UsersResponse | null> => {
  const options: AxiosRequestConfig = {
    params: {
      page,
      limit,
    },
  };
  const { apiConfig } = ApiConfig;

  try {
    const res = await UsersApi(apiConfig).usersControllerFindAll({
      ...options,
      ...getCommonOptions(),
    });
    // pass an instance of axios with set header as parameter res(-->here<---)
    const data = (await res()).data;
    return data;
  } catch (error) {
    console.error("api error", error);
    return Promise.resolve(null);
  }
};
