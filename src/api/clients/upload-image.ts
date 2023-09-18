import axios from "axios";

import { ApiConfig, baseUrl } from "../api-config";

export type HostedImageInfo = {
  web: {
    png: string;
  };
  mobile: {
    png: string;
  };
};

// TODO see why generated api client is not working
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const uploadImage = async (file: File): Promise<HostedImageInfo> => {
  console.log(file);

  const { apiConfig } = ApiConfig;
  const formData = new FormData();
  formData.append("file_field_name", file);

  try {
    const response = await api.post<HostedImageInfo>(
      "/api/mgmt/image/upload",
      formData
    );

    // const response = await ImageApi(apiConfig).imageControllerUpload(
    //   formData as any,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    // response();
    return response.data;
  } catch (error) {
    console.error("There was an error uploading the file:", error);
    throw error;
  }
};
