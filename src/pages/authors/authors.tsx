import { Table, TableColumn } from "@Confrontend/ui-library";
import { useEffect, useState } from "react";

import { UserDto } from "../../api/openapi/generated-clients/api-user";
import { getUsers } from "../../api/services/get-users.service";
import { useUserStore } from "../../stores/user-store";

export type User = Omit<UserDto, "id" | "googleId" | "active"> & {
  active: "Active" | "Inactive";
};

function Authors() {
  const { setUsersInStore } = useUserStore();
  const [tableUsers, setTableUsers] = useState<User[] | null>([] as User[]);

  const columns: TableColumn<User>[] = [
    {
      Header: " ",
      Cell: ({ row }: any) => row.index + 1,
      width: "5%",
      accessor: "" as any,
    },
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
      if (res && res.users) {
        setUsersInStore(res);
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
