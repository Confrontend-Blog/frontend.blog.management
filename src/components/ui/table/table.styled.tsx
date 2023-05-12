import styled from "styled-components";

export const TableWrapper = styled.table`
  background-color: #fff;
  border-collapse: collapse;
  width: 100%;
`;

export const TableHeader = styled.th<{ width?: string | number }>`
  text-align: left;

  &:first-child {
    text-align: center;
  }
  background-color: ${({ theme }) => theme.palette.info.main};
  color: #fff;
  height: 4em;
  width: ${({ width }) => width || "auto"}
`;
export const TableCell = styled.td`
  text-align: left;

  &:first-child {
    text-align: center;
  }
`;

export const TableRow = styled.tr`
  height: 4em;

  &:nth-of-type(odd) {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }

  :hover {
    color: ${({ theme }) => theme.palette.info.main};
    cursor: pointer;
  }
`;
