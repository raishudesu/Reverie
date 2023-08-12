import Header from "@/components/header";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useFirebaseServices } from "@/stores/useFirebase";

const SignIn = () => {
  const navigate = useNavigate();
  const { currentUser } = useFirebaseServices();

  useEffect(() => {
    currentUser ? navigate("/home") : null;
  }, [currentUser, navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center p-2">
      <Header />
      <Outlet />
    </div>
  );
};

export default SignIn;
