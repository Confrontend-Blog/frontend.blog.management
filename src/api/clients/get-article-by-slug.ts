import { api } from "../api-config";
import { ArticleDto } from "../openapi/generated-clients/api-blog";

export const getArticleBySlug = async (
  slug: string
): Promise<ArticleDto | null> => {
  try {
    const res = await api.articlesControllerFindOne(slug);
    const data = (await res()).data;
    return data;
  } catch (error) {
    console.error("api error", error);
    return Promise.resolve(null);
  }
};
