import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as St from "./styles";
interface IProps extends TouchableOpacityProps {
  title: string;
}

export const Button = ({ title, ...rest }: IProps) => {
  return (
    <St.Button {...rest}>
      <St.ButtonTitle>{title}</St.ButtonTitle>
    </St.Button>
  );
};
