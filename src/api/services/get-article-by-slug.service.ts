import { getArticleFacade } from "../facades/api-facade";
import { ArticleDto } from "../openapi/generated-clients/api-blog";
import { handleResponse } from "../utils/api-response.utils";

export const getArticleBySlug = async (
  slug: string
): Promise<ArticleDto | undefined | string> => {
  const result = await getArticleFacade(slug);
  return handleResponse<ArticleDto>(result);
};
