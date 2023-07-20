import { createGlobalStyle } from "styled-components";
// todo lose the "styled-components"
const AppGlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-size: ${({ theme }) => theme.typography.body1};
    background-color:  ${({ theme }) => theme.palette.background.paper};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    color:  ${({ theme }) => theme.palette.secondary};

  }
  p {
    font-family: "Source Sans Pro", sans-serif;
  }

 
`;

export { AppGlobalStyle };
