import React from "react";
import { Text } from "react-native";
import * as St from "./styles";
import { HighlightCard } from "../../components/HighligthCard";
import {
  ITransactionCardProps,
  TransactionCard,
} from "../../components/TransactionCard";

export interface IDataListProps extends ITransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: IDataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "13/04/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: { name: "Alimentação", icon: "coffee" },
      date: "10/04/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: { name: "Casa", icon: "home" },
      date: "10/04/2020",
    },
  ];
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
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 13 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </St.HighlightCards>
      <St.Transactions>
        <St.Title>Listagem</St.Title>
        <St.TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </St.Transactions>
    </St.Container>
  );
}
