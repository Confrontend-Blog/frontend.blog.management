import logger from "../../utils/error-handling/logger";
import { uploadImageApiFacade } from "../facades/api-facade";

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
  logger.debug(file);

  const formData = new FormData();
  formData.append("file_field_name", file);

  const res = await uploadImageApiFacade(formData as any);
  return res.data;
};
