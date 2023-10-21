import { getAllUsersApi } from "../api-facade";
import { UsersResponse } from "../openapi/generated-clients/api-user/api";

export const getUsers = async (
  page = 1,
  limit = 10
): Promise<UsersResponse | null> => {
  const res = await getAllUsersApi({
    params: {
      page,
      limit,
    },
  });

  return res.data ?? null;
};
