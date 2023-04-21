import { ApiConfig } from "../openapi/api-config";
import {
  ArticleDto,
  CreateArticleDto,
  DefaultApiFp as ArticlesApi,
} from "../openapi/generated-clients/api";

export const createArticle = async ({
  title,
  summary,
  date = new Date().toISOString(),
  content,
  category,
  author = "",
  slug,
}: CreateArticleDto): Promise<ArticleDto | void> => {
  const { apiConfig } = ApiConfig;

  try {
    const res = await ArticlesApi(apiConfig).articlesControllerCreate({
      title,
      summary,
      date,
      content,
      category,
      author,
      slug,
    });
    const data = (await res()).data;

    return data;
  } catch (error) {
    console.error("api error", error);
    return Promise.resolve();
  }
};
