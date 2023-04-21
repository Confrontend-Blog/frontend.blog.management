import styled from "styled-components";

interface WrapperProps {
  isCollapsed: boolean;
}

// TODO: get rid of first/last child. implement separate sc components for each.
export const Wrapper = styled.span<WrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;

  > :first-child {
    flex: 0 0 ${({ isCollapsed }) => (isCollapsed ? "100%" : "80%")};
  }

  > :last-child {
    > div {
      align-items: center;
      text-align: center;
      position: fixed;
      height: 100%;
      background-color: ${({ theme }) => theme.palette.primary.main};
      border-left: 1px solid #99999950;
      // TODO fix
      width: -webkit-fill-available;
    }
    top: 0;
    flex: 0 0 ${({ isCollapsed }) => (isCollapsed ? "0%" : "20%")};
    overflow: auto; /* add scrollbars if content overflows */
  }
`;
