import { api, getCommonOptions } from "../api-config";

export type HostedImageInfo = {
  web: {
    png: string;
  };
  mobile: {
    png: string;
  };
};

// TODO see why generated api client is not working
// const api = axios.create({
//   baseURL: baseUrl,
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });

export const uploadImage = async (file: File): Promise<HostedImageInfo> => {
  console.log(file);

  const formData = new FormData();
  formData.append("file_field_name", file);

  try {
    const res = await api.imageControllerUpload(
      formData as any,
      getCommonOptions()
    );
    const data = (await res()).data as HostedImageInfo;
    return data;
  } catch (error) {
    console.error("There was an error uploading the file:", error);
    throw error;
  }
};
