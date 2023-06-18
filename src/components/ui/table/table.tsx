import { useTable } from "react-table";

import * as S from "./table.styled";

type TableProps<T> = {
  onRowClick?: ((row: T) => void) | undefined;
  data: T[];
  columns: any;
  hiddenColumns?: string[];
};

function Table<T extends object>({
  onRowClick,
  data,
  columns,
  hiddenColumns,
}: TableProps<T>) {
  const initialState = hiddenColumns
    ? { hiddenColumns }
    : { hiddenColumns: [""] };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      initialState,
    });

  return (
    <S.TableWrapper {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <S.TableHeader {...column.getHeaderProps()} width={column.width}>
                {column.render("Header")}
              </S.TableHeader>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <S.TableRow
              {...row.getRowProps()}
              onClick={() => onRowClick && onRowClick(row.original)}
            >
              {row.cells.map((cell) => {
                return (
                  <S.TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </S.TableCell>
                );
              })}
            </S.TableRow>
          );
        })}
      </tbody>
    </S.TableWrapper>
  );
}
export default Table;
