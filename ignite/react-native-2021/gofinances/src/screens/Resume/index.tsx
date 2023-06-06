import React, { useCallback, useState } from "react";
import * as St from "./styles";
import { HistoryCard } from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ITransactionCardProps } from "../../components/TransactionCard";
import { categories } from "../../utils/categories";
import { ScrollView } from "react-native-gesture-handler";
interface CategoryData {
  name: string;
  total: string;
  color: string;
}
export const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );
  const collectionKey = "@gofinances:transactions";
  const loadData = async () => {
    const data = await AsyncStorage.getItem(collectionKey);
    const convertedData = data ? JSON.parse(data) : [];

    const expensives = convertedData.filter(
      (expensive: ITransactionCardProps) => expensive.type == "negative"
    );
    const totalByCategory: CategoryData[] = [];
    categories.forEach((c) => {
      let categorySum = 0;
      expensives.forEach((e: ITransactionCardProps) => {
        if (e.category == c.key) {
          categorySum += Number(e.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        totalByCategory.push({ name: c.name, total, color: c.color });
      }
    });

    setTotalByCategories(totalByCategory);
  };
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );
  return (
    <St.Container>
      <St.Header>
        <St.Title>Resumo por categoria</St.Title>
      </St.Header>
      <St.ScrollView>
        {totalByCategories.map((i) => (
          <HistoryCard
            key={i.name}
            title={i.name}
            amount={i.total}
            color={i.color}
          />
        ))}
      </St.ScrollView>
    </St.Container>
  );
};
