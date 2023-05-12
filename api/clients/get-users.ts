import { AxiosRequestConfig } from "axios";
import { ApiConfig } from "../api-config";
import {
  UsersResponse,
  DefaultApiFp as UsersApi,
} from "../openapi/generated-clients/api-user/api";
import { getStoredToken } from "../../src/components/auth/client-token-storage";

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
  //apiConfig.accessToken = getStoredToken() || "";

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
