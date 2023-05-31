import React from "react";
import * as St from "./styles";
import { categories } from "../../utils/categories";

export interface ITransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}
interface IProps {
  data: ITransactionCardProps;
}

export const TransactionCard = ({ data }: IProps) => {
  const category = categories.filter((item) => item.key == data.category)[0];
  return (
    <St.Container>
      <St.Title>{data.name}</St.Title>
      <St.Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </St.Amount>
      <St.Footer>
        <St.Category>
          <St.CategoryIcon name={category.icon}></St.CategoryIcon>
          <St.CategoryName>{category.name}</St.CategoryName>
        </St.Category>
        <St.Date>{data.date}</St.Date>
      </St.Footer>
    </St.Container>
  );
};
