import { createArticleApi } from "../api-facade";
import { CreateArticleDto } from "../openapi/generated-clients/api-blog/api";
import { handleResponse } from "../utils/api-response.utils";

export const createArticle = async ({
  title,
  summary,
  date = new Date().toISOString(),
  content,
  category,
  author = "",
  slug,
}: CreateArticleDto): Promise<
  | CreateArticleDto
  | undefined
  | string /* TODO replace "string" with an error object */
> => {
  const result = await createArticleApi({
    title,
    summary,
    date,
    content,
    category,
    author,
    slug,
  });

  return handleResponse<CreateArticleDto>(result);
};
