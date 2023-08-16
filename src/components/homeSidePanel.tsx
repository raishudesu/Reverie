import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { ModeToggle } from "./mode-toggle";
import { db, useFirebaseServices } from "@/stores/useFirebase";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { doc, onSnapshot } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { BiLoaderAlt } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import SignOutDialog from "./signOutDialog";

const HomeSidePanel = () => {
  const navigate = useNavigate();
  const { currentUser, setUsername, username } = useFirebaseServices();
  const uid = currentUser?.uid;
  const usernameRef = doc(db, `users/${uid}`);
  const getUsername = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(usernameRef, (doc) => {
        if (doc.exists()) {
          const usernameData = doc.data();
          setUsername(usernameData.username);
          resolve(usernameData);
        } else {
          // Handle the case where the document doesn't exist
          reject(new Error("No such document!"));
        }
      });

      // Unsubscribe from the listener when not needed anymore
      if (currentUser) return unsubscribe;
    });
  };
  const { isLoading } = useQuery({
    queryKey: ["userDetails"],
    queryFn: getUsername,
    refetchOnWindowFocus: false,
  });

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
              <h1 className="text-md font-bold">{username}</h1>
            </div>
            <button
              className="flex gap-2 font-semibold items-center text-xl"
              onClick={() => navigate("/home")}
            >
              <CgNotes size={20} />
              Entries
            </button>
            <button
              className="flex gap-2 font-semibold items-center text-xl"
              onClick={() => navigate("/home/profile")}
            >
              <AiOutlineUser size={20} />
              Profile
            </button>
            <button
              className="flex gap-2 font-semibold items-center text-xl"
              onClick={() => navigate("/home/notifications")}
            >
              <AiOutlineBell size={20} />
              Notifications
            </button>
            <button
              className="flex gap-2 font-semibold items-center text-xl"
              onClick={() => navigate("/home/settings")}
            >
              <FiSettings size={20} />
              Settings
            </button>

            <ModeToggle />
          </div>

          {currentUser ? (
            <div className="flex justify-start items-start w-full">
              <SignOutDialog />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomeSidePanel;
