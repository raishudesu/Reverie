import { ThemeProvider } from "@/components/theme-provider";
import SignIn from "./pages/signIn";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInForm from "./components/signInForm";
import SignUpForm from "./components/signUpForm";
import Protected from "./components/protected";
import Home from "./pages/home";
import Header from "./components/header";
import Profile from "./pages/profile";
import HomePosts from "./pages/homePosts";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route element={<SignIn />}>
            <Route path="/" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Route>
          <Route
            element={
              <Protected>
                <Home />
              </Protected>
            }
          >
            <Route path="/home" element={<HomePosts />} />
            <Route path="/home/profile" element={<Profile />} />
          </Route>
        </Routes>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
