import React from "react";
import { TextInputProps } from "react-native";

import * as St from "./styles";
type Props = TextInputProps;

export const Input = ({ ...rest }: Props) => {
  return <St.Input {...rest}/>;
};
