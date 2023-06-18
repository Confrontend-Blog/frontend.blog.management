import * as S from "./top-bar.styled";
import { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import { useLocation } from "react-router-dom";
import { urlToPAgeTile } from "../../../utils/string.util";
import { useUserStore } from "../../../stores/user-store";

const TopBar = () => {
  const [left, setLeft] = useState(<></>);
  const [right, setRight] = useState(<></>);
  const location = useLocation();
  const { loggedInUsername } = useUserStore();
  console.log('TopBar',loggedInUsername);
  

  useEffect(() => {
    setLeft(<>{urlToPAgeTile(location.pathname)}</>);
    setRight(
      <>
        <ChatIcon />
        <NotificationsIcon />
        <span>{loggedInUsername}</span>
      </>
    );
  }, [location, loggedInUsername]);

  return (
    <S.NavigationWrapper>
      {left}
      {right && <S.ItemRightWrapper>{right}</S.ItemRightWrapper>}
    </S.NavigationWrapper>
  );
};

export default TopBar;
