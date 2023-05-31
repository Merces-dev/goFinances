import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as St from "./styles";
import { HighlightCard } from "../../components/HighligthCard";
import {
  ITransactionCardProps,
  TransactionCard,
} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IDataListProps extends ITransactionCardProps {
  id: string;
}

interface IHighlightProps {
  amount: string;
}

interface IHighlightData {
  entries: IHighlightProps;
  expensives: IHighlightProps;
  total: IHighlightProps;
}

export function Dashboard() {
  const collectionKey = "@gofinances:transactions";
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightData>({
    entries: {
      amount: "0",
    },
    expensives: {
      amount: "0",
    },
    total: {
      amount: "0",
    },
  });

  async function loadTransactions() {
    let entriesAmount = 0;
    let expensiveAmount = 0;
    let totalAmount = 0;
    const response = await AsyncStorage.getItem(collectionKey);
    const transactions = response ? JSON.parse(response) : [];
    const transactionsFormatted: IDataListProps[] = transactions.map(
      (item: IDataListProps) => {
        if (item.type === "positive") {
          entriesAmount += Number(item.amount);
        } else {
          expensiveAmount += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          date,
          type: item.type,
          category: item.category,
        };
      }
    );

    totalAmount = entriesAmount - expensiveAmount;
    setHighlightData({
      entries: {
        amount: entriesAmount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensives: {
        amount: expensiveAmount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: totalAmount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });
    setTransactions(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <St.Container>
      <St.Header>
        <St.HeaderWrapper>
          <St.UserInfo>
            <St.Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/61596432?v=4",
              }}
            />
            <St.User>
              <St.UserGreeting>Olá,</St.UserGreeting>
              <St.UserName>Giovani</St.UserName>
            </St.User>
          </St.UserInfo>
          <St.Logout onPress={() => {}}>
            <St.Icon name="power" />
          </St.Logout>
        </St.HeaderWrapper>
      </St.Header>
      <St.HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount={highlightData.entries.amount}
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.expensives.amount}
          lastTransaction="Última saída dia 13 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction="01 à 16 de abril"
        />
      </St.HighlightCards>
      <St.Transactions>
        <St.Title>Listagem</St.Title>
        <St.TransactionList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </St.Transactions>
    </St.Container>
  );
}
