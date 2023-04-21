import styled, { css } from "styled-components";

type ButtonWrapperProps = {
  color: string | undefined;
  bgColor: string | undefined;
  hoverColor: string | undefined;
  hoverBgColor: string | undefined;
};

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  border: 1px solid;
  border-radius: 0.75em;
  display: inline-block;
  cursor: pointer;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  &:hover {
    background-color: #eee;
    color: #000;
  }

  &:disabled {
    color: rgba(151, 151, 151, 1);
    cursor: not-allowed;
    box-shadow: none;
    background-color: #222;
    pointer-events: none;
  }

  ${({ color, bgColor, hoverBgColor, hoverColor }) => css`
    color: ${color};
    background-color: ${bgColor};
    &:hover {
      background-color: ${hoverBgColor};
      color: ${hoverColor};
    }
  `}
`;
