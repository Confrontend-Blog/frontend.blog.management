import { waitFor } from "@testing-library/react";

import {
  ArticleSummariesResponse,
  ArticleSummaryDto,
} from "../../api/openapi/generated-clients/api-blog";
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
  it.only("should render Articles' table columns", async () => {
    getSummariesMocked.mockReturnValue(Promise.resolve(articlesResponseMock));
    const wrapper = customRender(<Articles />);

    await waitFor(async () => {
      expect(await wrapper.findByText("Title")).toBeDefined();
      expect(await wrapper.findByText("Date")).toBeDefined();
      expect(await wrapper.findByText("Category")).toBeDefined();
      expect(await wrapper.findByText("Author")).toBeDefined();
    });
  });

  it("should toggle the collapse state when the icon button is clicked", async () => {
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

  it("should toggle the collapse state when selecting a row", async () => {
    const wrapper = customRender(<Articles />);
    const rows = await wrapper.findAllByRole("row");
    await waitFor(() => {
      expect(rows.length).toBeGreaterThan(0);
    });

    await waitFor(async () => {
      rows[1].click();
      // await wrapper.findByText(articlesResponseMock.summaries[0].summary);
    });
  });
});
