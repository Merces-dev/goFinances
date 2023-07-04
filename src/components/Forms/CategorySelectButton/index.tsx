import React from "react";

import * as St from "./styles";
import { TouchableOpacityProps } from "react-native";
interface IProps extends TouchableOpacityProps{
  title: string;
}

export const CategorySelectButton = ({ title, ...rest }: IProps) => {
  return (
    <St.Container {...rest}>
      <St.Category>{title}</St.Category>
      <St.Icon name='chevron-down'/>
    </St.Container>
  );
};

