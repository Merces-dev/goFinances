import React from "react";
import * as St from "./styles";

interface ICategory {
  name: string;
  icon: string;
}
export interface ITransactionCardProps {
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: ICategory;
  date: string;
}
interface IProps {
  data: ITransactionCardProps;
}

export const TransactionCard = ({ data }: IProps) => {
  return (
    <St.Container>
      <St.Title>{data.title}</St.Title>
      <St.Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </St.Amount>
      <St.Footer>
        <St.Category>
          <St.CategoryIcon name={data.category.icon}></St.CategoryIcon>
          <St.CategoryName>{data.category.name}</St.CategoryName>
        </St.Category>
        <St.Date>{data.date}</St.Date>
      </St.Footer>
    </St.Container>
  );
};
