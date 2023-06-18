import { render, screen, waitFor } from "@testing-library/react";

import { getUsers } from "../../../api/clients/get-users";
import { usersMock, usersResponseMock } from "../../../mocks/users-mock";
import { useUserStore } from "../../stores/user-store";
import Authors from "./authors";

jest.mock("../../../api/clients/get-users");
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
    console.log(usersMock);

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
