import React from "react";
import { Text } from "react-native";
import * as St from "./styles";

export function Dashboard() {
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
          <St.Icon name="power" />
        </St.HeaderWrapper>
      </St.Header>
    </St.Container>
  );
}
