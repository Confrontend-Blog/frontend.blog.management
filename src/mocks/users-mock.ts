import { faker } from "@faker-js/faker";

import {
  UserDto,
  UsersResponse,
} from "../api/openapi/generated-clients/api-user/api";

const generateUser = (): UserDto => {
  return {
    id: faker.number.int(1000),
    displayName: faker.person.fullName(),
    email: faker.internet.email(),
    active: faker.datatype.boolean(),
    googleId: faker.string.alphanumeric(5),
  };
};

const usersNumber = 10;
export const usersMock: UserDto[] = Array.from(
  { length: usersNumber },
  generateUser
);

export const usersResponseMock: UsersResponse = {
  users: usersMock,
  count: usersMock.length,
};
