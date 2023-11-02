import { getAllUsersApiFacade } from "../facades/api-facade";
import { UsersResponse } from "../openapi/generated-clients/api-users";

export const getUsers = async (
  page = 1,
  limit = 10
): Promise<UsersResponse | null> => {
  const res = await getAllUsersApiFacade({
    params: {
      page,
      limit,
    },
  });

  return res.data ?? null;
};
