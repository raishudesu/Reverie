import HomeSidePanel from "@/components/homeSidePanel";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center p-4 ">
      <div className="overflow-hidden rounded-lg w-full mt-16 max-h-fit md:w-[65%] flex justify-center border ">
        <HomeSidePanel />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
