import { ButtonBase, ListItem, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";

import { RoutePaths } from "../../../root-component";
import { useLogout } from "../logout/logout";
import MenuItems from "./menu-items";
import * as S from "./side-menu.styled";

function SideMenu() {
  const logout = useLogout();

  return (
    <S.Wrapper>
      <S.LogoWrapper>
        <S.Logo />
      </S.LogoWrapper>
      <S.MenuItemsWrapper>
        <MenuItems />
      </S.MenuItemsWrapper>
      <S.MenuFooter>
        <Link to={RoutePaths.Login}>
          <ButtonBase onClick={logout}>
            <ListItem>
              <ListItemIcon>
                <S.LogoutIcon />
              </ListItemIcon>
              <S.StyledListItemText primary="Logout" />
            </ListItem>
          </ButtonBase>
        </Link>
      </S.MenuFooter>
    </S.Wrapper>
  );
}

export default SideMenu;
