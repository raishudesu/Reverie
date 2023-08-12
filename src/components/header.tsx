import { ModeToggle } from "./mode-toggle";
import { SheetSide } from "./sheetSide";
import { Button } from "./ui/button";
import { useSignIn } from "@/stores/useFirebase";
import { toast } from "./ui/use-toast";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, signOut } = useSignIn();
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
    <div className="fixed top-0 w-full h-[3.5em] shadow-sm shadow-gray-200 dark:shadow-gray-700 flex justify-center items-center">
      <div className="w-full md:w-[75%] flex justify-between items-center gap-4">
        <div className="flex justify-center items-center">
          <SheetSide />
          <h1 className="font-bold text-2xl">Reverie</h1>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {currentUser ? (
            <Button
              variant={"ghost"}
              onClick={userSignOut}
              className="flex gap-2 items-center"
            >
              Sign out
              <MdLogout size={20} />
            </Button>
          ) : null}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
