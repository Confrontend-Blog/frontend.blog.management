import axios, { AxiosRequestConfig } from "axios";

import { ApiResponse } from "../api-facade";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

const customCatch = (error: any) => {
  if (error.response) {
    // The server responded with a status code outside of the 2xx range
    console.log("Server responded with error:", error.response.data);
    return { error: error.response.data.message || "Server error" };
  } else if (error.request) {
    // The request was made but no response was received
    console.log("No response received:", error.request);
    return { error: "No response from server" };
  } else {
    // Some other error occurred in setting up the request
    console.log("Error setting up request:", error.message);
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
