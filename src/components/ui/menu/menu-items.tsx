import { ButtonBase, List, ListItemIcon } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { RoutePaths } from "../../../root-component";
import * as S from "./menu-items.styled";

const MenuItems = () => {
  const location = useLocation();
  const isActiveRoute = (route: string) => location.pathname === route || false;

  return (
    <List>
      <Link to={RoutePaths.Dashboard}>
        <ButtonBase>
          <S.StyledListItem $isActive={isActiveRoute(RoutePaths.Dashboard)}>
            <ListItemIcon>
              <S.StyledDashboardIcon />
            </ListItemIcon>
            <S.StyledListItemText primary="Dashboard" />
          </S.StyledListItem>
        </ButtonBase>
      </Link>
      <Link to={RoutePaths.Composer}>
        <ButtonBase>
          <S.StyledListItem $isActive={isActiveRoute(RoutePaths.Composer)}>
            <ListItemIcon>
              <S.StyledComposerIcon />
            </ListItemIcon>
            <S.StyledListItemText primary="Composer" />
          </S.StyledListItem>
        </ButtonBase>
      </Link>
      <Link to={RoutePaths.Authors}>
        <ButtonBase>
          <S.StyledListItem $isActive={isActiveRoute(RoutePaths.Authors)}>
            <ListItemIcon>
              <S.StyledAuthorIcon />
            </ListItemIcon>
            <S.StyledListItemText primary="Authors" />
          </S.StyledListItem>
        </ButtonBase>
      </Link>
      <Link to={RoutePaths.Articles}>
        <ButtonBase>
          <S.StyledListItem $isActive={isActiveRoute(RoutePaths.Articles)}>
            <ListItemIcon>
              <S.StyledArticleIcon />
            </ListItemIcon>
            <S.StyledListItemText primary="Articles" />
          </S.StyledListItem>
        </ButtonBase>
      </Link>
      <Link to={RoutePaths.Messages}>
        <ButtonBase>
          <S.StyledListItem $isActive={isActiveRoute(RoutePaths.Messages)}>
            <ListItemIcon>
              <S.StyledChatIcon />
            </ListItemIcon>
            <S.StyledListItemText primary="Messages" />
          </S.StyledListItem>
        </ButtonBase>
      </Link>
      <Link to={RoutePaths.Settings}>
        <ButtonBase>
          <S.StyledListItem $isActive={isActiveRoute(RoutePaths.Settings)}>
            <ListItemIcon>
              <S.StyledSettingsIcon />
            </ListItemIcon>
            <S.StyledListItemText primary="Settings" />
          </S.StyledListItem>
        </ButtonBase>
      </Link>
    </List>
  );
};

export default MenuItems;
