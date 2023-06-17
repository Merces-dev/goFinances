import React, { useCallback, useState } from "react";
import * as St from "./styles";
import { HistoryCard } from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ITransactionCardProps } from "../../components/TransactionCard";
import { categories } from "../../utils/categories";
import { ScrollView } from "react-native-gesture-handler";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivityIndicator } from "react-native";

interface CategoryData {
  name: string;
  total: number;
  totalFormatted: string;
  percent: string;
  color: string;
}
export const Resume = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );
  const collectionKey = "@gofinances:transactions";
  const theme = useTheme();

  const handleDateChange = (action: "next" | "prev") => {
    if (action === "next") {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    const data = await AsyncStorage.getItem(collectionKey);
    const convertedData = data ? JSON.parse(data) : [];

    const expensives = convertedData.filter(
      (expensive: ITransactionCardProps) =>
        expensive.type == "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );
    const expensiveTotal = expensives.reduce(
      (accumulator: number, expensive: ITransactionCardProps) => {
        return accumulator + expensive.amount;
      },
      0
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
        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(0)}%`;
        totalByCategory.push({
          name: c.name,
          total: categorySum,
          totalFormatted: total,
          percent,
          color: c.color,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  };
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );
  return (
    <St.Container>
      <St.Header>
        <St.Title>Resumo por categoria</St.Title>
      </St.Header>
      {isLoading ? (
        <St.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </St.LoadContainer>
      ) : (
        <St.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <St.MonthSelect>
            <St.MonthSelectButton onPress={() => handleDateChange("prev")}>
              <St.MonthSelectIcon name="chevron-left" />
            </St.MonthSelectButton>
            <St.Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </St.Month>
            <St.MonthSelectButton onPress={() => handleDateChange("next")}>
              <St.MonthSelectIcon name="chevron-right" />
            </St.MonthSelectButton>
          </St.MonthSelect>
          {totalByCategories.length <= 0 ? (
            <St.NoContentContainer>
              <St.NoContentTitle>Sem dados para serem exibidos</St.NoContentTitle>
            </St.NoContentContainer>
          ) : (
            <>
              <St.ChartContainer>
                <VictoryPie
                  data={totalByCategories}
                  colorScale={totalByCategories.map((c) => c.color)}
                  style={{
                    labels: {
                      fontSize: RFValue(18),
                      fontWeight: "bold",
                      fill: theme.colors.shape,
                    },
                  }}
                  width={300}
                  height={300}
                  labelRadius={55}
                  x="percent"
                  y="total"
                />
              </St.ChartContainer>
              {totalByCategories.map((i) => (
                <HistoryCard
                  key={i.name}
                  title={i.name}
                  amount={i.totalFormatted}
                  color={i.color}
                />
              ))}
            </>
          )}
        </St.ScrollView>
      )}
    </St.Container>
  );
};
