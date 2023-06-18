import Tile from "../../components/ui/tile/tile";
import { theme } from "../../styles/theme";
import * as S from "./dashboard.styled";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <S.Container>
        <Tile
          title={"Visits Overview"}
          content={
            <div>
              <h1>Total visits today: 104k</h1>
              <h5>Up 6.1% compared to yesterday</h5>
              <h5>Up 0.1% compared to same day last month</h5>
            </div>
          }
        />
        <Tile
          title={"Top Article Today"}
          content={
            <div>
              <h1>Comparing Linaria and Styled-Components</h1>
              <h5>Total view: 10.3k</h5>
              <h5>Online since: 15.04.2023</h5>
            </div>
          }
        />
        <Tile
          title={"Top Author Today"}
          content={
            <div>
              <h1>Jessica TopWriter</h1>
              <h5>Total engagement 8.5k</h5>
              <h5>Likes: 1.4k</h5>
            </div>
          }
        />
        <Tile
          title={"Visits Overview"}
          content={
            <div>
              <h1>Visitors Location</h1>
              <h5>41% California</h5>
              <h5>32% New York</h5>
              <h5>27% Texas</h5>
            </div>
          }
        />
      </S.Container>
    </>
  );
};

export default Dashboard;
