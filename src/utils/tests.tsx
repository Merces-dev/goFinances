import { ThemeProvider } from "styled-components/native"
import theme from "../global/styles/theme"
import { AuthProvider } from "../hooks/auth"

const Providers: React.FC = ({ children }: any) => (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      {children}
      </AuthProvider>
    </ThemeProvider>
  )
export {Providers}