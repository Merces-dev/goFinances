import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthSession from "expo-auth-session";
import { CLIENT_ID, REDIRECT_URI } from "react-native-dotenv";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  signOut(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isUserStoragedLoading, setIsUserStoragedLoading] = useState(true);
  const storageKey = "@gofinances:user";
  const signInWithGoogle = async () => {
    const creds = {
      client_id: CLIENT_ID ?? "",
      redirect_uri: REDIRECT_URI ?? "",
      response_type: "token",
      scope: "profile email",
    };
    console.log(creds);
    const searchParams = new URLSearchParams(creds);
    const authUrl =
      "https://accounts.google.com/o/oauth2/v2/auth?" + searchParams.toString();

    const { type, params } = (await AuthSession.startAsync({
      authUrl,
    })) as AuthorizationResponse;
    if (type === "success") {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
      );
      const userInfo = await response.json();
      setUser({
        id: userInfo.id,
        name: userInfo.email,
        email: userInfo.given_name,
        photo: userInfo.picture,
      });
      await AsyncStorage.setItem(storageKey, JSON.stringify(user));
    }
  };

  const signInWithApple = async () => {
    try {
      const creds = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (creds) {
        setUser({
          id: creds.user,
          name: creds.fullName!.givenName!,
          email: creds.email!,
        });
        await AsyncStorage.setItem(storageKey, JSON.stringify(user));
      }
    } catch (error) {
      throw new Error("");
    }
  };
  const signOut = async () => {
    setUser({} as User);
    await AsyncStorage.removeItem(storageKey);
  };
  useEffect(() => {
    const loadUserStorageData = async () => {
      const userStoraged = await AsyncStorage.getItem(storageKey);
      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }
      setIsUserStoragedLoading(false);
    };
    loadUserStorageData();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
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
