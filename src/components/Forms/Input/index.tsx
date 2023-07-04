import React from "react";
import { TextInputProps } from "react-native";

import * as St from "./styles";
interface IProps extends TextInputProps {}

export const Input = ({ ...rest }: IProps) => {
  return <St.Input {...rest} />;
};
