import { createArticleApi } from "../api-facade";
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
  const result = await createArticleApi({
    title,
    summary,
    date,
    content,
    category,
    author,
    slug,
  });
  if (result.data) {
    return result.data;
  } else if (result.error) {
    console.log("createArticleApi", result.error);
  }
};
