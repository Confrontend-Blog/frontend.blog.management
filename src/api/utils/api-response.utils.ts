import logger from "../../utils/error-handling/logger";
import { ApiResponse } from "../facades/api-facade";

export const handleResponse = <T>(result: ApiResponse<T>) => {
  if (result.data) {
    return result.data;
  } else if (result.error) {
    logger.error(`"createArticleApi:" ${result.error}`);
    return result.error;
  }
};
