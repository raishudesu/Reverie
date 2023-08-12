import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/header";
import SignIn from "./pages/signIn";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <SignIn />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
