import { render, screen, waitFor } from "@testing-library/react";

import { getUsers } from "../../api/services/get-users.service";
import { usersMock, usersResponseMock } from "../../data-mocks/users-mock";
import { useUserStore } from "../../stores/user-store";
import Authors from "./authors";

jest.mock("../../api/services/get-users.service");
const getUsersMock = jest.mocked(getUsers);

jest.mock("../../stores/user-store");
const useUserStoreMock = jest.mocked(useUserStore);

describe("Authors component", () => {
  beforeEach(() => {
    getUsersMock.mockReturnValue(Promise.resolve(usersResponseMock));
    useUserStoreMock.mockReturnValue({
      setUsersInStore: jest.fn(),
    });
  });

  it("fetches users on mount and updates state", async () => {
    render(<Authors />);

    waitFor(() => {
      expect(getUsers).toHaveBeenCalledWith(1, 100);
      expect(useUserStore().setUsersInStore).toHaveBeenCalledWith({
        usersMock,
      });
      usersMock.forEach((user) => {
        expect(screen.getByText(user.displayName)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
        expect(
          screen.getByText(user.active ? "Active" : "Inactive")
        ).toBeInTheDocument();
      });
    });
  });
});
