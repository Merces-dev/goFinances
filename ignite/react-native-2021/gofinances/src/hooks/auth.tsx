import React, { ReactNode, createContext, useContext } from "react";
import * as AuthSession from "expo-auth-session";
interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}
interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const signInWithGoogle = async () => {
    const creds = {
      client_id:
        "495199902515-s27lludabqdeevhlvuah5nr9qkj49i55.apps.googleusercontent.com",
      redirect_uri: "https://auth.expo.io/@mercesdev/gofinances",
      response_type: "token",
      scope: "profile email",
    };

    const searchParams = new URLSearchParams(creds);
    const authUrl =
      "https://accounts.google.com/o/oauth2/v2/auth?" + searchParams.toString();

    const { type, params } = (await AuthSession.startAsync({
      authUrl,
    })) as AuthorizationResponse;
    if (type === "success") {
      const response = await fetch(
        `https://googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
      );
      console.log({ response });
      const userInfo = await response.json();
    }
  };
  const signInWithApple = async () => {
    const creds = {
      client_id:
        "495199902515-s27lludabqdeevhlvuah5nr9qkj49i55.apps.googleusercontent.com",
      redirect_uri: "https://auth.expo.io/@mercesdev/gofinances",
      response_type: "token",
      scope: "profile email",
    };

    const searchParams = new URLSearchParams(creds);
    const authUrl =
      "https://accounts.google.com/o/oauth2/v2/auth?" + searchParams.toString();

    const { type, params } = (await AuthSession.startAsync({
      authUrl,
    })) as AuthorizationResponse;
    if (type === "success") {
      const response = await fetch(
        `https://googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
      );
      console.log({ response });
      const userInfo = await response.json();
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user: { id: "112", name: "Giovani Merces", email: "2312323@gmai.com" },
        signInWithGoogle,
        signInWithApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth };
