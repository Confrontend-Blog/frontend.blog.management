import { waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { getSummaries } from "../../api/clients/get-article-summaries";
import { articlesMock, articlesResponseMock } from "../../mocks/articles-mock";
import { customRender } from "../../mocks/custom-renderer";
import Articles from "./articles";

vi.mock("../../api/clients/get-article-summaries", () => {
  // Return an object that mocks the exports of the module
  return {
    getSummaries: vi.fn().mockResolvedValue(articlesResponseMock),
  };
});

describe("Articles", () => {
  beforeEach(() => {
    // console.log(getSummariesMock);
    // getSummariesMock.mockReturnValueOnce(Promise.resolve(articlesResponseMock));
  });

  test("should render Articles' table columns", async () => {
    const wrapper = customRender(<Articles />);
    await waitFor(async () => {
      expect(await wrapper.findByText("Title")).toBeDefined();
      expect(await wrapper.findByText("Date")).toBeDefined();
      expect(await wrapper.findByText("Category")).toBeDefined();
      expect(await wrapper.findByText("Author")).toBeDefined();
    });
  });

  test("should toggle the collapse state when the icon button is clicked", async () => {
    const wrapper = customRender(<Articles />);
    const expand = wrapper.getByTestId("expand");

    // Initially collapsed
    await waitFor(() => {
      expect(wrapper.queryByText("Summary")).toBeNull();
    });

    await waitFor(() => {
      expand.click();
      expect(wrapper.getByText("Summary")).toBeDefined();
    });

    // Should hide the summary
    await waitFor(() => {
      expand.click();
      expect(wrapper.queryByText("Summary")).toBeNull();
    });
  });

  test("should toggle the collapse state when selecting a row", async () => {
    const wrapper = customRender(<Articles />);
    const rows = await wrapper.findAllByRole("row");
    await waitFor(() => {
      expect(rows.length).toBeGreaterThan(0);
    });

    await waitFor(async () => {
      rows[1].click();
      expect(
        await wrapper.findByText(articlesResponseMock.summaries[0].summary)
      ).toBeDefined();
    });
  });
});
