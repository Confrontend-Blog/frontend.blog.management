import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Description";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AuthorIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { ListItem, ListItemText } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import styled from "styled-components";

const createStyledIcon = (IconComponent: OverridableComponent<any>) => {
  return styled(IconComponent)`
    color: ${({ theme }) => theme.palette.primary.main};
  `;
};

export const StyledDashboardIcon = createStyledIcon(DashboardIcon);
export const StyledComposerIcon = createStyledIcon(EditNoteIcon);
export const StyledAuthorIcon = createStyledIcon(AuthorIcon);
export const StyledArticleIcon = createStyledIcon(ArticleIcon);
export const StyledChatIcon = createStyledIcon(ChatIcon);
export const StyledSettingsIcon = createStyledIcon(SettingsIcon);

export const StyledListItemText = styled(ListItemText)`
  &:active {
    color: ${({ theme }) =>
      theme.palette.error.main}; // Change the active color here
  }
  color: ${({ theme }) => theme.palette.primary.main};
  ${({ theme }) => theme.breakpoints.down("md")} {
    display: none;
  }
`;

export const StyledListItem = styled(ListItem)<{ $isActive?: boolean }>`
  ${({ $isActive, theme }) =>
    $isActive &&
    `
    & .MuiSvgIcon-root {
      color: ${theme.palette.info.main};
    }

    & .MuiListItemText-root {
      color: ${theme.palette.info.main};
    }
  `}

  &:hover {
    cursor: pointer;

    & .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.info.main};
    }

    & .MuiListItemText-root {
      color: ${({ theme }) => theme.palette.info.main};
    }
  }
`;
