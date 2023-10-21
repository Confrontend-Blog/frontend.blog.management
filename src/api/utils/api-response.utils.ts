import { ApiResponse } from "../api-facade";

export const handleResponse = <T>(result: ApiResponse<T>) => {
  if (result.data) {
    return result.data;
  } else if (result.error) {
    console.log("createArticleApi", result.error);
    return result.error;
  }
};
