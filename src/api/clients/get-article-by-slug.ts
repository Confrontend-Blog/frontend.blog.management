import { ApiConfig } from "../api-config";
import {
  ArticleDto,
  DefaultApiFp as ArticlesApi,
} from "../openapi/generated-clients/api-blog";

export const getArticleBySlug = async (
  slug: string
): Promise<ArticleDto | null> => {
  const { apiConfig } = ApiConfig;

  try {
    const res = await ArticlesApi(apiConfig).articlesControllerFindOne(slug);
    const data = (await res()).data;
    return data;
  } catch (error) {
    console.error("api error", error);
    return Promise.resolve(null);
  }
};
