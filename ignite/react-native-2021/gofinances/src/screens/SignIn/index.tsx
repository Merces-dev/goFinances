import React, { useContext } from "react";
import * as St from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { Alert } from "react-native";
export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
    }
  }
  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
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

          <SignInSocialButton
            onPress={handleSignInWithApple}
            svg={AppleSvg}
            title="Entrar com Apple"
          />
        </St.FooterWrapper>
      </St.Footer>
    </St.Container>
  );
}
