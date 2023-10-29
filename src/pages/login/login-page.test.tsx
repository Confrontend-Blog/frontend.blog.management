import { screen } from "@testing-library/react";

import { customRender } from "../../data-mocks/custom-renderer";
import { RoutePaths } from "../../root-component";
import LoginPage from "./login-page";

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  };
});

const navigateMock = jest.fn();

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("LoginPage", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useNavigateMock = require("react-router-dom")
      .useNavigate as jest.Mock;
    useNavigateMock.mockReturnValue(navigateMock);
  });

  it("redirects to dashboard if user is already authenticated via context", () => {
    customRender(<LoginPage />);

    expect(navigateMock).toHaveBeenCalledWith(RoutePaths.Dashboard);
  });

  it("redirects to dashboard if user is already authenticated via local storage", () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify({ id: "123" }));
    // Set user to {} meaning there is no logged in user
    customRender(<LoginPage />, {} as any);

    expect(navigateMock).toHaveBeenCalledWith(RoutePaths.Dashboard);
  });

  it("shows login button if user is not authenticated", () => {
    // Set user to {} meaning there is no logged in user
    customRender(<LoginPage />, {} as any);

    expect(screen.getByText("You need to log in")).toBeInTheDocument();
    expect(screen.getByText("Login via Google")).toBeInTheDocument();
  });

  // Add more tests if necessary, for example, testing the button click behavior.
});
