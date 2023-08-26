import AddReverie from "@/components/addReverie";
import EditProfilePicture from "@/components/editProfilePicture";
import EditUsernameDialog from "@/components/editUsernameDialog";
import Posts from "@/components/posts";
import ProfilePic from "@/components/profilePic";
import SkeletonLoader from "@/components/skeleton";
import { Card, CardHeader } from "@/components/ui/card";
import { useFirebaseServices } from "@/stores/useFirebase";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { username, currentUser, fetchPosts, profilePicUrl } =
    useFirebaseServices();

  const { isLoading, isSuccess } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
      <Card className="border-b-0 h-32 bg-gradient-to-r rounded-b-none from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]"></Card>
      <div className="flex flex-col gap-2">
        <Card className="border-t-0 rounded-t-none">
          <CardHeader className="flex flex-col justify-center items-start ">
            <div className="w-[150px] h-[150px] ">
              <ProfilePic profPicUrl={profilePicUrl} />
            </div>
            <div className="w-full flex justify-between items-center flex-wrap gap-4">
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
        </Card>
        <Card className="w-full p-4">
          <AddReverie />
        </Card>
        {isLoading && (
          <div className="flex flex-col gap-9 mt-6">
            {Array.from({ length: 16 }).map((_, index) => (
              <div key={index}>
                <SkeletonLoader />
              </div>
            ))}
          </div>
        )}
        {isSuccess && (
          <div className="w-full mt-2">
            <Posts />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
