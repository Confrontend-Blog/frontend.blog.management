import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { advanceTo, clear } from "jest-date-mock";

import { CreateArticleDto } from "../../api/openapi/generated-clients/api-blog";
import { createArticle } from "../../api/services/create-article.service";
import { customRender } from "../../data-mocks/custom-renderer";
import Composer from "./composer";

jest.mock("../../api/services/create-article.service");

// Mock debounce to bypass it in tests
jest.mock("lodash/debounce", () => (fn: any) => fn);

const createArticleMock = jest.mocked(createArticle);
const mockedArticleCreateResponse: CreateArticleDto = {
  title: "Test Article Title",
  slug: "test-article-title",
  content: "test content",
  category: "Frontend",
  summary: "Test Article Summary",
  date: expect.any(String), // Check if it's a string
  author: "H",
};

describe("Composer component", () => {
  beforeAll(() => {
    advanceTo(new Date("2023-10-29T04:38:01.754Z"));
  });

  afterAll(() => {
    clear();
  });

  it("submits a new article", async () => {
    createArticleMock.mockResolvedValue(mockedArticleCreateResponse);

    customRender(<Composer />);

    const titleInput = screen.getByLabelText(/title/i);
    await userEvent.type(titleInput, "Test Article Title");

    const summaryInput = screen.getByLabelText(/Summary/i);
    await userEvent.type(summaryInput, "Test Article Summary");

    const autocompleteInput = screen.getByLabelText(/Category/i);
    await userEvent.type(autocompleteInput, "Frontend");

    const textarea = screen.getByPlaceholderText("Content text here...");
    fireEvent.change(textarea, {
      target: { value: mockedArticleCreateResponse.content },
    });

    await waitFor(() => {
      expect(textarea.innerHTML).toBe(mockedArticleCreateResponse.content);
    });

    const submitButton = screen.getByText("Create");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(createArticle).toHaveBeenCalledWith(mockedArticleCreateResponse);
    });
  });

  it("disable create (submit) button if not all fields are filled out", async () => {
    createArticleMock.mockResolvedValue(mockedArticleCreateResponse);

    customRender(<Composer />);

    // Title Input deliberately left empty

    const summaryInput = screen.getByLabelText(/Summary/i);
    await userEvent.type(summaryInput, "Test Article Summary");

    const autocompleteInput = screen.getByLabelText(/Category/i);
    await userEvent.type(autocompleteInput, "Frontend");

    const textarea = screen.getByPlaceholderText("Content text here...");
    fireEvent.change(textarea, {
      target: { value: mockedArticleCreateResponse.content },
    });

    await waitFor(() => {
      expect(textarea.innerHTML).toBe(mockedArticleCreateResponse.content);
    });

    const submitButton = screen.getByText("Create");

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
});
