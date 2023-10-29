import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CreateArticleDto } from "../../api/openapi/generated-clients/api-blog";
import { createArticle } from "../../api/services/create-article.service";
import Composer, { categories } from "./composer";

jest.mock("../../api/services/create-article.service");
const createArticleMock = jest.mocked(createArticle);
const mockedArticleCreateResponse: CreateArticleDto = {
  title: "Test Article Title",
  slug: "test-article-title",
  content: expect.any(String),
  category: "Frontend",
  summary: "Test Article Summary",
  date: expect.any(String),
  author: "H",
};

describe("Composer component", () => {
  it("submits a new article", async () => {
    createArticleMock.mockResolvedValue(mockedArticleCreateResponse);

    render(<Composer />);

    const titleInput = screen.getByLabelText(/title/i);
    userEvent.type(titleInput, "Test Article Title");

    const summaryInput = screen.getByLabelText(/Summary/i);
    userEvent.type(summaryInput, "Test Article Summary");

    const autocompleteInput = screen.getByLabelText(/Category/i);
    userEvent.type(autocompleteInput, "Frontend");

    const submitButton = screen.getByText("Create");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(createArticle).toHaveBeenCalledWith(mockedArticleCreateResponse);
    });
  });
});
