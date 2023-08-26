import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useFirebaseServices } from "@/stores/useFirebase";
import { BiLoaderAlt } from "react-icons/bi";
import Dreamer from "../assets/dreamer.svg";

const SignIn = () => {
  const navigate = useNavigate();
  const { currentUser, initializeAuthStateListener } = useFirebaseServices();

  const [isLoading, setIsLoading] = useState(true);

  // to refrain the sign in page on rendering if user exists
  useEffect(() => {
    const checkUser = () => {
      initializeAuthStateListener();
      currentUser
        ? navigate("/home")
        : setTimeout(() => {
            setIsLoading(false);
          }, 2000);
    };
    checkUser();
  }, [currentUser, navigate, initializeAuthStateListener]);

  return (
    <div className="w-full h-screen max-h-fit flex justify-center items-center p-2">
      {isLoading ? (
        <BiLoaderAlt className="animate-spin" size={30} />
      ) : (
        <>
          <div className="flex justify-center items-center">
            <div className="max-w-fit flex justify-evenly items-center gap-6">
              <img
                src={Dreamer}
                alt=""
                className="hidden lg:block max-w-[50%] p-4"
              />
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
