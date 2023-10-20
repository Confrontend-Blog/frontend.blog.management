import { AxiosRequestConfig } from "axios";

import { api, getCommonOptions } from "../api-config";
import { UsersResponse } from "../openapi/generated-clients/api-user/api";

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

  try {
    const res = await api.usersControllerFindAll({
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
