import { AiOutlineUser } from "react-icons/ai";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { MdLogout } from "react-icons/md";
import { toast } from "./ui/use-toast";
import { useFirebaseServices } from "@/stores/useFirebase";
import { useNavigate } from "react-router-dom";

const HomeSidePanel = () => {
  const navigate = useNavigate();
  const { currentUser, signOut } = useFirebaseServices();
  const userSignOut = () => {
    try {
      signOut();
      toast({
        title: "User signed out.",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" hidden max-h-fit w-[40%] xl:w-[20%] md:flex flex-col justify-start items-start p-4 gap-6 ">
      <div className="grid gap-4 py-4 h-full">
        <div className="flex flex-col justify-between items-start gap-4">
          <div className="flex flex-col justify-start items-start gap-6">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="rounded-full p-4 bg-gradient-to-r from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]">
                <AiOutlineUser size={20} />
              </div>

              <h1 className="text-sm">{currentUser?.email}</h1>
            </div>
            <div className="flex gap-2 font-semibold items-center text-xl">
              <AiOutlineUser size={20} />
              My Reverie
            </div>
            <ModeToggle />
          </div>

          {currentUser ? (
            <div className="flex justify-start items-start w-full">
              <Button
                variant={"ghost"}
                onClick={userSignOut}
                className="flex gap-2 items-center"
              >
                Sign out
                <MdLogout size={20} />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomeSidePanel;
