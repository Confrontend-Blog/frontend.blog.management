import { useEffect, useState } from "react";
import Table from "../../components/ui/table/table";
import { UserDto } from "../../../api/openapi/generated-clients/api-user";
import { getUsers } from "../../../api/clients/get-users";

type User = Omit<UserDto, "id" | "googleId" | "active"> & {
  active: "Active" | "Inactive";
};

function Authors() {
  const [users, setUsers] = useState<User[] | null>([] as User[]);

  const columns: any = [
    { Header: " ", Cell: ({ row }: any) => row.index + 1, width: "5%" },
    {
      Header: "Name",
      accessor: "displayName", // is hidden
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
      const res = await getUsers(1, 100);
      if (res && res.users) {
        setUsers(
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

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div>
      {users?.length && (
        <Table<User>
          data={users}
          //  onRowClick={onRowClick}
          columns={columns}
        />
      )}
    </div>
  );
}

export default Authors;
