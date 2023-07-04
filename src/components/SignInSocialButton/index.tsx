import React from "react";
import { TouchableOpacityProps } from "react-native";
import * as St from "./styles";
import { SvgProps } from "react-native-svg";

interface IProps extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export const SignInSocialButton = ({ title, svg: Svg, ...rest }: IProps) => {
  return (
    <St.Button {...rest}>
      <St.ImageContainer>
        <Svg width={30} height={30} />
      </St.ImageContainer>
      <St.Title>{title}</St.Title>
    </St.Button>
  );
};
