import { uploadImageApi } from "../api-facade";

export type HostedImageInfo = {
  web: {
    png: string;
  };
  mobile: {
    png: string;
  };
};

export const uploadImage = async (
  file: File
): Promise<HostedImageInfo | undefined> => {
  console.log(file);

  const formData = new FormData();
  formData.append("file_field_name", file);

  try {
    const res = await uploadImageApi(formData as any);
    return res.data;
  } catch (error) {
    console.error("There was an error uploading the file:", error);
    throw error;
  }
};
