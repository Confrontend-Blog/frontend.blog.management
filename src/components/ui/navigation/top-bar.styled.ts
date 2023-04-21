import { Link } from "@mui/material";
import styled from "styled-components";

type NavigationWrapperProps = {
  linkStyle?: string;
};

export const NavigationWrapper = styled.span<NavigationWrapperProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 4em;
  height: ${({ theme }) => theme.spacing(10)};
  a {
    text-decoration: none;
    color: unset;
  }
`;

export const ItemRightWrapper = styled.span`
  display: grid;
  grid-template-columns: 2em 2em 10em;
  align-items: center;
  justify-items: right;
  margin-left: auto;
  gap: 1em;
  color: ${({ theme }) => theme.palette.background.default};
`;

export const StyledLink = styled(Link)(({ theme }) => ({
  "&:link": {
    color: theme.palette.action.active,
    textDecoration: "none",
  },
  "&:visited": {
    color: theme.palette.action.active,
    textDecoration: "none",
  },
  "&:hover": {
    textDecoration: "none",
  },
}));
