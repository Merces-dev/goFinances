import React from "react";
import * as St from "./styles";

interface Props {
  title: string;
  amount: string;
  color: string;
}
export const HistoryCard = ({ color, title, amount }: Props) => {
  return (
    <St.Container color={color} testID="history-card">
      <St.Title testID="history-card-title">{title}</St.Title>
      <St.Amount testID="history-card-amount">{amount}</St.Amount>
    </St.Container>
  );
};
