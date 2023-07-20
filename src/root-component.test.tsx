
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { RootComponent } from "./root-component";

jest.mock("./pages/user-inactive/user-inactive.tsx", () => () => (
  <div>UserInactive</div>
));
jest.mock("./App", () => () => <div>App</div>);

describe("RootComponent", () => {
  it("renders UserInactive component when path is /inactive", () => {
    window.history.pushState({}, "", "/inactive");
    render(
      <MemoryRouter initialEntries={["/inactive"]}>
        <RootComponent />
      </MemoryRouter>
    );

    expect(screen.getByText("UserInactive")).toBeInTheDocument();
  });

  it("renders App component when path is anything else", async () => {
    window.history.pushState({}, "", "/other");
    render(
      <MemoryRouter initialEntries={["/other"]}>
        <RootComponent />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

    expect(screen.getByText("App")).toBeInTheDocument();
  });
});
