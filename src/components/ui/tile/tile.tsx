import { CardContent, Typography } from "@mui/material";
import { CSSProperties, ReactNode } from "react";

import * as S from "./tile.styled";

type TileProps = {
  title: ReactNode;
  content: ReactNode;
  /** example: "200px","2em", "3rem" */
  width?: `${number}px` | `${number}em` | `${number}rem` | `${number}%`;
  /** default: "1x1" */
  dimension?: "1x1" | "1x2" | "2x1";
  style?: CSSProperties;
};

const Tile = ({
  title,
  content,
  width = "100%",
  dimension = "1x1",
  style
}: TileProps) => {
  return (
    <S.StyledCard style={style} width={width} dimension={dimension}>
      <CardContent>
        {title}

        {content}
      </CardContent>
    </S.StyledCard>
  );
};

export default Tile;
