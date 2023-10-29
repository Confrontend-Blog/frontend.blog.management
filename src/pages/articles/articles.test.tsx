import { screen, waitFor } from "@testing-library/react";

import { getSummaries } from "../../api/services/get-article-summaries.service";
import { articlesResponseMock } from "../../mocks/articles-mock";
import { customRender } from "../../mocks/custom-renderer";
import Articles from "./articles";

jest.mock("../../api/services/get-article-summaries.service");
jest.mock("../../api/facades/api-facade");
jest.mock("jwt-decode", () => jest.fn(() => ({ name: "Mock Name" })));

jest.mock("../../api/services/get-article-summaries.service");

const getSummariesMocked = jest.mocked(getSummaries);

describe("Articles", () => {
  beforeEach(() => {
    getSummariesMocked.mockReturnValue(Promise.resolve(articlesResponseMock));
  });

  it("should render Articles' table columns", async () => {
    customRender(<Articles />);

    await waitFor(async () => {
      expect(await screen.findByText("Title")).toBeDefined();
      expect(await screen.findByText("Date")).toBeDefined();
      expect(await screen.findByText("Category")).toBeDefined();
      expect(await screen.findByText("Author")).toBeDefined();
    });
  });

  it("should toggle the collapse state when the icon button is clicked", async () => {
    customRender(<Articles />);
    const expand = screen.getByTestId("expand");

    // Initially collapsed
    await waitFor(() => {
      expect(screen.queryByText("Summary")).toBeNull();
    });

    await waitFor(() => {
      expand.click();
      expect(screen.getByText("Summary")).toBeDefined();
    });

    // Should hide the summary
    await waitFor(() => {
      expand.click();
      expect(screen.queryByText("Summary")).toBeNull();
    });
  });

  it("should toggle the collapse state when selecting a row", async () => {
    customRender(<Articles />);
    const rows = await screen.findAllByRole("row");
    await waitFor(() => {
      expect(rows.length).toBeGreaterThan(0);
    });

    await waitFor(async () => {
      rows[1].click();
      await screen.findByText(
        articlesResponseMock.data?.summaries[0].summary || ""
      );
    });
  });
});
