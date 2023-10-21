import { getArticle } from "../api-facade";
import { ArticleDto } from "../openapi/generated-clients/api-blog";
import { handleResponse } from "../utils/api-response.utils";

export const getArticleBySlug = async (
  slug: string
): Promise<ArticleDto | undefined | string> => {
  const result = await getArticle(slug);
  return handleResponse<ArticleDto>(result);
};
