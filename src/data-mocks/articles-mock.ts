import { faker } from "@faker-js/faker";

import { ApiResponse } from "../api/facades/api-facade";
import {
  ArticleSummariesResponse,
  ArticleSummaryDto,
} from "../api/openapi/generated-clients/api-blog";

const title = faker.lorem.words(5);

const generateArticles = (): ArticleSummaryDto => ({
  id: faker.string.numeric(10),
  title,
  date: faker.date.recent().toISOString(),
  category: faker.lorem.word(),
  author: faker.person.fullName(),
  summary: faker.lorem.sentence(),
  slug: faker.helpers.slugify(title),
});

const articlesNumber = 10;
export const articlesMock: ArticleSummaryDto[] = Array.from(
  { length: articlesNumber },
  generateArticles
);

export const articlesResponseMock: ApiResponse<ArticleSummariesResponse> = {
  data: { summaries: articlesMock, count: articlesMock.length },
};
