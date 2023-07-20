import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 5em;
  row-gap: 2em;
  margin-bottom: 10em;
`;
