import React from "react";
import { TouchableOpacityProps } from "react-native";
import * as St from "./styles";

const icons = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
};

interface IProps extends TouchableOpacityProps {
  type: "income" | "outcome";
  isActive: boolean;
}

export const TransactionTypeButton = ({ type, isActive, ...rest }: IProps) => {
  return (
    <St.Button {...rest} isActive={isActive} type={type}>
      <St.Icon name={icons[type]} type={type} />
      <St.Title>{type}</St.Title>
    </St.Button>
  );
};
