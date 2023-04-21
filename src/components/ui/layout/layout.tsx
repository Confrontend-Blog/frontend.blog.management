import TopBar from "../navigation/top-bar";
import * as S from "./layout.styled";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../../../app-routes";
import SideMenu from "../menu/side-menu";

const Layout = () => {
  return (
    <S.Wrapper>
      <S.NavigationWrapper>
        <TopBar />
      </S.NavigationWrapper>
      <SideMenu />
      <S.Content>
        <AppRoutes />
      </S.Content>
    </S.Wrapper>
  );
};

export default Layout;
