import { ReactNode, MouseEvent } from "react";
import * as S from "./cui-button.styled";

export type CuiButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  color?: string;
  bgColor?: string;
  hoverColor?: string;
  hoverBgColor?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};
/**
 * UI Button
 */
const CuiButton = ({
  children,
  onClick,
  color,
  bgColor,
  hoverColor,
  hoverBgColor,
  disabled,
  type = undefined,
}: CuiButtonProps) => {
  return (
    <S.ButtonWrapper
      onClick={onClick}
      color={color}
      bgColor={bgColor}
      hoverColor={hoverColor}
      hoverBgColor={hoverBgColor}
      disabled={disabled}
      type={type}
    >
      {children}
    </S.ButtonWrapper>
  );
};

export default CuiButton;
