import { ThemeProvider } from "styled-components/native";
import theme from "../global/styles/theme";
import { AuthProvider } from "../hooks/auth";
import { NavigationContainer } from "@react-navigation/native";

const Providers: React.FC = ({ children }: any) => (
  <NavigationContainer>
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  </NavigationContainer>
);
export { Providers };
