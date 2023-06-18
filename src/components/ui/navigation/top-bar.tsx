import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import AuthContext from "../../../providers/auth-conext";
import { urlToPAgeTile } from "../../../utils/string.util";
import * as S from "./top-bar.styled";

const TopBar = () => {
  const [left, setLeft] = useState(<></>);
  const [right, setRight] = useState(<></>);
  const location = useLocation();
  const { username } = useContext(AuthContext);

  useEffect(() => {
    setLeft(<>{urlToPAgeTile(location.pathname)}</>);
    setRight(
      <>
        <ChatIcon />
        <NotificationsIcon />
        <span>{username}</span>
      </>
    );
  }, [location, username]);

  return (
    <S.NavigationWrapper>
      {left}
      {right && <S.ItemRightWrapper>{right}</S.ItemRightWrapper>}
    </S.NavigationWrapper>
  );
};

export default TopBar;
