import { create } from "zustand";

import { UsersResponse } from "../api/openapi/generated-clients/api-user";

interface UserState {
  loggedInUsername: string | null;
  users: UsersResponse | null;
  setLoggedInUser: (user: string | null) => void;
  setUsersInStore: (users: UsersResponse | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  loggedInUsername: null,
  users: null,
  setLoggedInUser: (username) => set(() => ({ loggedInUsername: username })),
  setUsersInStore: (users) => set(() => ({ users: users })),
}));
