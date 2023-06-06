import React from "react";
import * as St from "./styles";

interface Props {
  title: string;
  amount: string;
  color: string;
}
export const HistoryCard = ({ color, title, amount }: Props) => {
  return (
    <St.Container color={color}>
      <St.Title>{title}</St.Title>
      <St.Amount>{amount}</St.Amount>
    </St.Container>
  );
};
