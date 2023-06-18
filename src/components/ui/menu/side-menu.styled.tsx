import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListItemText from "@mui/material/ListItemText";
import styled from "styled-components";

export const Wrapper = styled.span`
  grid-area: menu;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.background.paper};
  position: sticky;
  top: 0;
  height: 100vh;
  min-width: 12rem;
  max-width: 12rem;

  ${({ theme }) => theme.breakpoints.down("md")} {
    min-width: 3.5rem;
    max-width: 3.5rem;
    overflow-x: hidden;
  }
`;

export const LogoWrapper = styled.span`
  flex: 0.2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 80%;
  padding-top: 80%; // This will maintain aspect ratio based on width
  background-image: url("/logo.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  ${({ theme }) => theme.breakpoints.down("md")} {
    background-image: url("/logo-mini.png");
  }
`;

export const MenuItemsWrapper = styled.span`
  flex: 0.8;
  display: flex;
  align-items: baseline;
  justify-content: left;
`;

export const MenuFooter = styled.span`
  flex: 0.2;
  display: flex;
  align-items: center;
  justify-content: left;
`;

export const LogoutIcon = styled(ExitToAppIcon)`
  flex: 0.8;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const StyledListItemText = styled(ListItemText)`
  color: ${({ theme }) => theme.palette.primary.main};
  ${({ theme }) => theme.breakpoints.down("md")} {
    display: none;
  }
`;
