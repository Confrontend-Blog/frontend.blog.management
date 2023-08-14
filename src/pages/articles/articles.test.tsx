import { act, screen, waitFor } from "@testing-library/react";

import { getSummaries } from "../../api/clients/get-article-summaries";
import { articlesResponseMock } from "../../mocks/articles-mock";
import { customRender } from "../../mocks/custom-renderer";
import Articles from "./articles";

jest.mock("../../../api/clients/get-article-summaries");
const getSummariesMock = jest.mocked(getSummaries);

describe("Articles", () => {
  beforeEach(() => {
    getSummariesMock.mockReturnValueOnce(Promise.resolve(articlesResponseMock));
  });

  it("should render Articles' table columns", async () => {
    act(() => {
      customRender(<Articles />);
    });

    await waitFor(async () => {
      expect(await screen.findByText("Title")).toBeInTheDocument();
      expect(await screen.findByText("Date")).toBeInTheDocument();
      expect(await screen.findByText("Category")).toBeInTheDocument();
      expect(await screen.findByText("Author")).toBeInTheDocument();
    });
  });

  it("should toggle the collapse state when the icon button is clicked", async () => {
    act(() => {
      customRender(<Articles />);
    });

    const expand = screen.getByTestId("expand");

    // Initially collapsed
    await waitFor(() => {
      expect(screen.queryByText("Summary")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expand.click();
      expect(screen.getByText("Summary")).toBeInTheDocument();
    });

    // Should hide the summary
    await waitFor(() => {
      expand.click();
      expect(screen.queryByText("Summary")).not.toBeInTheDocument();
    });
  });

  it("should toggle the collapse state when selecting a row", async () => {
    act(() => {
      customRender(<Articles />);
    });

    const rows = await screen.findAllByRole("row");
    await waitFor(() => {
      expect(rows.length).toBeGreaterThan(0);
    });

    await waitFor(async () => {
      rows[1].click();
      expect(
        await screen.findByText(articlesResponseMock.summaries[0].summary)
      ).toBeInTheDocument();
    });
  });
});
