import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useFirebaseServices } from "@/stores/useFirebase";
import Header from "@/components/header";
import { BiLoaderAlt } from "react-icons/bi";

const SignIn = () => {
  const navigate = useNavigate();
  const { currentUser } = useFirebaseServices();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);

      if (currentUser) {
        navigate("/home");
      }
    }, 1000);

    // Clean up the timeout when the component unmounts
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [currentUser, navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center p-2">
      {isLoading ? (
        <BiLoaderAlt className="animate-spin" size={30} />
      ) : (
        <>
          <Header />
          <div className="flex justify-center items-center">
            <div className="max-w-fit flex justify-center items-center">
              <div className="hidden max-w-[20%] lg:flex flex-col"></div>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;
