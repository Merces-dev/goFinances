import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as St from "./styles";
import { HighlightCard } from "../../components/HighligthCard";
import {
  ITransactionCardProps,
  TransactionCard,
} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import theme from "../../global/styles/theme";
import { useAuth } from "../../hooks/auth";

export interface IDataListProps extends ITransactionCardProps {
  id: string;
}

interface IHighlightProps {
  amount: string;
  lastTransaction: string;
}

interface IHighlightData {
  entries: IHighlightProps;
  expensives: IHighlightProps;
  total: IHighlightProps;
}

export function Dashboard() {
  const { signOut } = useAuth();

  const collectionKey = "@gofinances:transactions";
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightData>({
    entries: {
      amount: "0",
      lastTransaction: "",
    },
    expensives: {
      amount: "0",
      lastTransaction: "",
    },
    total: {
      amount: "0",
      lastTransaction: "",
    },
  });

  const getLastTransactionDate = (
    collection: IDataListProps[],
    type: "positive" | "negative"
  ) => {
    let lastTransaction = null;
    lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction: IDataListProps) => transaction.type === type)
          .map((transaction: IDataListProps) =>
            new Date(transaction.date).getTime()
          )
      )
    );
    console.log(lastTransaction);
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  };
  async function loadTransactions() {
    let entriesAmount = 0;
    let expensiveAmount = 0;
    let totalAmount = 0;
    setIsLoading(true);
    const response = await AsyncStorage.getItem(collectionKey);
    const transactions = response ? JSON.parse(response) : [];
    const transactionsFormatted: IDataListProps[] = transactions
      .map((item: IDataListProps) => {
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
      })
      ?.reverse();

    totalAmount = entriesAmount - expensiveAmount;
    const lastTransactionsEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionsExpensives = getLastTransactionDate(
      transactions,
      "negative"
    );
    const totalInterval = `01 à ${lastTransactionsExpensives}`;
    setHighlightData({
      entries: {
        amount: entriesAmount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada ${lastTransactionsEntries}`,
      },
      expensives: {
        amount: expensiveAmount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída ${lastTransactionsExpensives}`,
      },
      total: {
        amount: totalAmount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setTransactions(transactionsFormatted);
    setIsLoading(false);
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
      {isLoading ? (
        <St.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </St.LoadContainer>
      ) : (
        <>
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
              <St.Logout
                onPress={() => {
                  signOut();
                }}
              >
                <St.Icon name="power" />
              </St.Logout>
            </St.HeaderWrapper>
          </St.Header>
          <St.HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
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
        </>
      )}
    </St.Container>
  );
}
