import { AxiosRequestConfig } from "axios";

import { ApiConfig } from "../api-config";
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

  console.log(apiConfig);

  try {
    const res = await UsersApi(apiConfig).usersControllerFindAll(options);
    const data = (await res()).data;
    return data;
  } catch (error) {
    console.error("api error", error);
    return Promise.resolve(null);
  }
};
