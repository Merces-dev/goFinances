import React, { useContext, useState } from "react";
import * as St from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { useTheme } from "styled-components";
export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
      setIsLoading(false);
    }
  }
  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple");
      setIsLoading(false);
    }
  }

  return (
    <St.Container>
      <St.Header>
        <St.TitleWrapper>
          <St.Logo name="dollar-sign" />
          <St.TitleApp>gofinances</St.TitleApp>
          <St.Title>
            Controle suas {"\n"}finanças de forma {"\n"}muito simples
          </St.Title>
        </St.TitleWrapper>
        <St.SignInTitle>
          Faça seu login com{"\n"} uma das contas abaixo
        </St.SignInTitle>
      </St.Header>
      <St.Footer>
        <St.FooterWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            svg={GoogleSvg}
            title="Entrar com Google"
          />
          {Platform.OS == "ios" && (
            <SignInSocialButton
              onPress={handleSignInWithApple}
              svg={AppleSvg}
              title="Entrar com Apple"
            />
          )}
        </St.FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </St.Footer>
    </St.Container>
  );
}
