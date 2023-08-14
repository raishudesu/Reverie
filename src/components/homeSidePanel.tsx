import { AiOutlineBell, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { MdLogout } from "react-icons/md";
import { toast } from "./ui/use-toast";
import { db, useFirebaseServices } from "@/stores/useFirebase";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { BiLoaderAlt } from "react-icons/bi";
import { useEffect } from "react";

const HomeSidePanel = () => {
  const navigate = useNavigate();
  const { currentUser, signOut, setUsername } = useFirebaseServices();
  const uid = currentUser?.uid;
  const usernameRef = doc(db, `users/${uid}`);

  const getUsername = async () => {
    try {
      const docSnap = await getDoc(usernameRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    isLoading,
    isSuccess,
    data = {},
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: getUsername,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const handleUsername = () => {
      if (isSuccess) {
        setUsername(data.username);
      } else {
        null;
      }
    };
    handleUsername();
  }, [data, setUsername, isSuccess]);

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
    <div className=" hidden max-h-fit w-[40%] xl:w-[30%] 2xl:w-[20%] md:flex flex-col justify-start items-start p-4 gap-6 ">
      <div className="grid gap-4 py-4 h-full">
        <div className="flex flex-col justify-between items-start gap-4">
          <div className="flex flex-col justify-start items-start gap-6">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="rounded-full p-4 bg-gradient-to-r from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]">
                <AiOutlineUser size={20} />
              </div>
              {isLoading ? (
                <BiLoaderAlt className="animate-spin" size={20} />
              ) : null}
              <h1 className="text-sm">{data?.username}</h1>
            </div>
            <button
              className="flex gap-2 font-semibold items-center text-xl"
              onClick={() => navigate("/home")}
            >
              <AiOutlineHome size={20} />
              Home
            </button>
            <button
              className="flex gap-2 font-semibold items-center text-xl"
              onClick={() => navigate("/home/profile")}
            >
              <AiOutlineUser size={20} />
              Profile
            </button>
            <div className="flex gap-2 font-semibold items-center text-xl">
              <AiOutlineBell size={20} />
              Notifications
            </div>
            <div className="flex gap-2 font-semibold items-center text-xl">
              <FiSettings size={20} />
              Settings
            </div>

            <ModeToggle />
          </div>

          {currentUser ? (
            <div className="flex justify-start items-start w-full">
              <Button
                variant={"ghost"}
                onClick={userSignOut}
                className="flex gap-2 items-center text-xl p-0"
              >
                <MdLogout size={22} />
                Sign out
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomeSidePanel;
