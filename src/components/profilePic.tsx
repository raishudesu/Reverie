import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFirebaseServices } from "@/stores/useFirebase";

const ProfilePic = () => {
  const { profilePicUrl } = useFirebaseServices();
  return (
    <Avatar className="w-full h-full">
      <AvatarImage
        src={profilePicUrl as string | undefined}
        alt="profile pic"
      />
      <AvatarFallback>R</AvatarFallback>
    </Avatar>
  );
};

export default ProfilePic;
