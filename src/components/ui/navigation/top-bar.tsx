import * as S from "./top-bar.styled";
import { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import { useLocation } from "react-router-dom";
import { urlToPAgeTile } from "../../../utils/string.util";

const TopBar = () => {
  const [left, setLeft] = useState(<></>);
  const [right, setRight] = useState(<></>);
  const location = useLocation();

  useEffect(() => {
    setLeft(<>{urlToPAgeTile(location.pathname)}</>);
    setRight(
      <>
        <ChatIcon />
        <NotificationsIcon />
        <span>Author</span>
      </>
    );
  }, [location]);

  return (
    <S.NavigationWrapper>
      {left}
      {right && <S.ItemRightWrapper>{right}</S.ItemRightWrapper>}
    </S.NavigationWrapper>
  );
};

export default TopBar;
