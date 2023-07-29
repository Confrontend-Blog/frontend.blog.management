import { ButtonBase, ListItem, ListItemIcon } from "@mui/material";

import { useLogout } from "../../../utils/auth/logout";
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
        <ButtonBase onClick={logout}>
          <ListItem>
            <ListItemIcon>
              <S.LogoutIcon />
            </ListItemIcon>
            <S.StyledListItemText primary="Logout" />
          </ListItem>
        </ButtonBase>
      </S.MenuFooter>
    </S.Wrapper>
  );
}

export default SideMenu;
