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

  const res = await uploadImageApi(formData as any);
  return res.data;
};
