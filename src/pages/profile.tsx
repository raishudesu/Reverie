import EditUsernameDialog from "@/components/editUsernameDialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFirebaseServices } from "@/stores/useFirebase";
import { AiOutlineUser } from "react-icons/ai";

const Profile = () => {
  const { username, currentUser } = useFirebaseServices();

  return (
    <div className="w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
      <div>
        <Card className="h-32 bg-gradient-to-r rounded-b-none from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]"></Card>
        <Card className="rounded-t-none">
          <CardHeader className="flex flex-col justify-center items-start ">
            <div className="rounded-full p-4 bg-gradient-to-r from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]">
              <AiOutlineUser size={40} />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-xl font-bold">{username}</p>
                <p className="text-sm text-muted-foreground">
                  {currentUser?.email}
                </p>
              </div>
              <EditUsernameDialog />
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Welcome to Reverie. More features coming soon.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
