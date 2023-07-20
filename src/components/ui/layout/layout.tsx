import AppRoutes from "../../../app-routes";
import SideMenu from "../menu/side-menu";
import TopBar from "../navigation/top-bar";
import * as S from "./layout.styled";

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
