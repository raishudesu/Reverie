import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import ModeToggle from "./mode-toggle";
import { db, useFirebaseServices } from "@/stores/useFirebase";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { doc, onSnapshot } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { BiLoaderAlt } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import SignOutDialog from "./signOutDialog";
import ProfilePic from "./profilePic";

const HomeSidePanel = () => {
  const navigate = useNavigate();
  const { currentUser, setUsername, username, getProfilePic } =
    useFirebaseServices();
  const uid = currentUser?.uid;
  const usernameRef = doc(db, `users/${uid}`);
  const getUserDetails = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(usernameRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setUsername(data.username);
          if (data.profPicUrl) {
            getProfilePic(data.profPicUrl);
          }

          resolve(data);
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
    queryFn: getUserDetails,
    refetchOnWindowFocus: false,
  });

  return (
    <div className=" hidden max-h-fit w-[45%] xl:w-[30%] 2xl:w-[20%] md:flex flex-col justify-start items-start p-4 gap-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
      <div className="grid gap-4 py-4 h-full">
        <div className="flex flex-col justify-between items-start gap-4">
          <div className="flex flex-col justify-start items-start gap-6">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
                <ProfilePic />
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
