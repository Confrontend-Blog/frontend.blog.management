import { ApiConfig, getHeaders } from "../api-config";
import {
  ArticleDto,
  CreateArticleDto,
  DefaultApiFp as ArticlesApi,
} from "../openapi/generated-clients/api-blog/api";

export const createArticle = async ({
  title,
  summary,
  date = new Date().toISOString(),
  content,
  category,
  author = "",
  slug,
}: CreateArticleDto): Promise<CreateArticleDto | void> => {
  const { apiConfig } = ApiConfig;

  try {
    const res = await ArticlesApi(apiConfig).articlesMgmtControllerCreate(
      {
        title,
        summary,
        date,
        content,
        category,
        author,
        slug,
      },
      { headers: getHeaders() }
    );
    const data = (await res()).data;

    return data;
  } catch (error) {
    console.error("api error", error);
    return Promise.resolve();
  }
};
