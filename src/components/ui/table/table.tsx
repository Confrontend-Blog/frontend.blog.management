import { MouseEventHandler, useMemo } from "react";
import { useTable } from "react-table";
import * as S from "./table.styled";
import { ArticleSummaryDto } from "../../../../api/openapi/generated-clients";

type TableProps = {
  onRowClick: ((row: any) => void) | undefined;
  data: ArticleSummaryDto[];
};

function Table({ onRowClick, data }: TableProps) {
  const columns: any = useMemo(
    () => [
      { Header: " ", Cell: ({ row }: any) => row.index + 1 , width: "5%" },
      {
        Header: "Summary",
        accessor: "summary", // is hidden
      },
      {
        Header: "Title",
        accessor: "title",
        width: "30%"
      },
      {
        Header: "Date",
        accessor: "date",
        width: "15%"
      },
      {
        Header: "Category",
        accessor: "category",
        width: "15%"
      },
      {
        Header: "Author",
        accessor: "author",
      },
    ],
    []
  );
  const initialState = { hiddenColumns: ["summary"] };

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
              onClick={() => onRowClick && onRowClick(row)}
            >
              {row.cells.map((cell) => {
                return (
                  <S.TableCell {...cell.getCellProps()} >
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
