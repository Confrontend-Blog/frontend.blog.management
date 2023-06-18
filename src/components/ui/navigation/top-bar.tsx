import * as S from "./top-bar.styled";
import { useContext, useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import { useLocation } from "react-router-dom";
import { urlToPAgeTile } from "../../../utils/string.util";
import AuthContext from "../../../providers/auth-conext";

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
