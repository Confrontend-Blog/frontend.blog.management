import axios, { AxiosRequestConfig } from "axios";

import logger from "../../utils/error-handling/logger";
import { ApiResponse } from "../facades/api-facade";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

const customCatch = (error: any) => {
  if (error.response) {
    // The server responded with a status code outside of the 2xx range
    logger.error(`Server responded with error: ${error.response.data}`);
    return { error: error.response.data.message || "Server error" };
  } else if (error.request) {
    // The request was made but no response was received
    logger.error(`No response received: ${error.request}`);
    return { error: "No response from server" };
  } else {
    // Some other error occurred in setting up the request
    logger.error(`Error setting up request:: ${error.message}`);
    return { error: error.message };
  }
};

export async function apiRequest<T>(
  requestConfig: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await axiosInstance.request<T>(requestConfig);
    return { data: response.data };
  } catch (error: any) {
    return customCatch(error);
  }
}
