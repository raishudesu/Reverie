import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/header";
import SignIn from "./pages/signIn";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <SignIn />
    </ThemeProvider>
  );
}

export default App;
