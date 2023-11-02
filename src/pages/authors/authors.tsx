import { Table, TableColumn, WithLoading } from "@Confrontend/ui-library";
import { useEffect, useState } from "react";

import { UserDto } from "../../api/openapi/generated-clients/api-users";
import { getUsers } from "../../api/services/get-users.service";
import { useUserStore } from "../../stores/user-store";

export type User = Omit<UserDto, "id" | "googleId" | "active"> & {
  active: "Active" | "Inactive";
};

function Authors() {
  const { setUsersInStore } = useUserStore();
  const [tableUsers, setTableUsers] = useState<User[] | null>([] as User[]);
  const [isLoading, setIsLoading] = useState(true);

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
      try {
        const res = await getUsers(1, 100);
        console.log("resresresres", res);
        if (res && res.users) {
          setIsLoading(false);
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
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <WithLoading isLoading={isLoading}>
      <>
        {tableUsers?.length && (
          <Table<User>
            data={tableUsers}
            //  onRowClick={onRowClick}
            columns={columns}
          />
        )}
      </>
    </WithLoading>
  );
}

export default Authors;
