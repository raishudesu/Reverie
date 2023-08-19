import EditProfilePicture from "@/components/editProfilePicture";
import EditUsernameDialog from "@/components/editUsernameDialog";
import ProfilePic from "@/components/profilePic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFirebaseServices } from "@/stores/useFirebase";

const Profile = () => {
  const { username, currentUser } = useFirebaseServices();

  return (
    <div className="w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
      <div>
        <Card className="border-b-0 h-32 bg-gradient-to-r rounded-b-none from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]"></Card>
        <Card className="border-t-0 rounded-t-none">
          <CardHeader className="flex flex-col justify-center items-start ">
            <div className="w-[150px] h-[150px] ">
              <ProfilePic />
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <p className="text-xl font-bold flex items-center gap-2">
                  {username} <EditUsernameDialog />
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentUser?.email}
                </p>
              </div>
              <EditProfilePicture />
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
