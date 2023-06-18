import { Card } from '@mui/material';
import styled from 'styled-components';

// Map of dimensions to height multipliers
const dimensions = {
  '1x1': 1,
  '1x2': 2,
  '2x1': 0.5,
};

type StyledCardProps = {
  width: string;
  dimension: "1x1" | "1x2" | "2x1";
};

export const StyledCard = styled(Card)<StyledCardProps>`
  width: ${(props) => props.width};
  height: calc(${(props) => props.width} * ${(props) => dimensions[props.dimension]});
`;
