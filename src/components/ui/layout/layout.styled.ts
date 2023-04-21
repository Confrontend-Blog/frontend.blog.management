import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "menu navigation"
    "menu content";
  grid-template-columns: minmax(auto, max-content) 1fr;
  grid-template-rows: 3rem 1fr;
  grid-row-gap: 4rem;
  height: 100vh;
`;

export const Content = styled.main`
  grid-area: content;
  overflow-y: auto;
  ${({ theme }) => theme.breakpoints.up("md")} {
  }
`;

export const NavigationWrapper = styled.div`
  grid-area: navigation;
`;
