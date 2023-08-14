import { Table } from "@Confrontend/ui-library";
import { useEffect, useState } from "react";

import { getUsers } from "../../api/clients/get-users";
import { UserDto } from "../../api/openapi/generated-clients/api-user";
import { useUserStore } from "../../stores/user-store";

export type User = Omit<UserDto, "id" | "googleId" | "active"> & {
  active: "Active" | "Inactive";
};

function Authors() {
  const { setUsersInStore } = useUserStore();
  const [tableUsers, setTableUsers] = useState<User[] | null>([] as User[]);

  const columns = [
    { Header: " ", Cell: ({ row }: any) => row.index + 1, width: "5%" },
    {
      Header: "Name",
      accessor: "displayName",
      width: "20%",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Active",
      accessor: "active",
      width: "20%",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      // TODO pagination
      const res = await getUsers(1, 100);
      setUsersInStore(res);
      if (res && res.users) {
        setTableUsers(
          res.users.map((user: UserDto) => {
            return {
              displayName: user.displayName,
              email: user.email,
              active: user.active ? "Active" : "Inactive",
            };
          })
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {tableUsers?.length && (
        <Table<User>
          data={tableUsers}
          //  onRowClick={onRowClick}
          columns={columns}
        />
      )}
    </div>
  );
}

export default Authors;
