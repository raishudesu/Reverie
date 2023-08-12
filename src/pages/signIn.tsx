import { Outlet } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center p-4">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default SignIn;
