import React from "react";
import * as St from "./styles";

interface IProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "up" | "down" | "total";
}
const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export const HighlightCard = ({
  type,
  title,
  amount,
  lastTransaction,
}: IProps) => {
  return (
    <St.Container type={type}>
      <St.Header>
        <St.Title type={type}>{title}</St.Title>
        <St.Icon name={icon[type]} type={type} />
      </St.Header>
      <St.Footer>
        <St.Amount type={type}>{amount}</St.Amount>
        <St.LastTransaction type={type}>{lastTransaction}</St.LastTransaction>
      </St.Footer>
    </St.Container>
  );
};
