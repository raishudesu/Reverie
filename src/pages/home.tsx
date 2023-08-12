import AddReverie from "@/components/addReverie";
import Posts from "@/components/posts";
import { AiOutlineUser } from "react-icons/ai";

const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-full md:w-[75%] mt-20 flex flex-col items-center gap-6 ">
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="rounded-full p-4 bg-gradient-to-r from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]">
              <AiOutlineUser size={60} />
            </div>
            <div className="font-semibold text-4xl">My Reverie</div>
          </div>
        </div>
        <div className="w-full md:w-[50%] p-4 shadow-md shadow-gray-200 dark:shadow-gray-700">
          <AddReverie />
        </div>
        <div className="w-full md:w-[50%] p-4 shadow-md shadow-gray-200 dark:shadow-gray-700">
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Home;
