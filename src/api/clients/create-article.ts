import { api, getCommonOptions } from "../api-config";
import { CreateArticleDto } from "../openapi/generated-clients/api-blog/api";

export const createArticle = async ({
  title,
  summary,
  date = new Date().toISOString(),
  content,
  category,
  author = "",
  slug,
}: CreateArticleDto): Promise<CreateArticleDto | void> => {
  try {
    const res = await api.articlesMgmtControllerCreate(
      {
        title,
        summary,
        date,
        content,
        category,
        author,
        slug,
      },
      getCommonOptions()
    );
    const data = (await res()).data;

    return data;
  } catch (error) {
    console.error("api error", error);
    return Promise.resolve();
  }
};
