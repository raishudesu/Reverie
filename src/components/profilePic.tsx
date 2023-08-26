import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePic = ({ profPicUrl }: { profPicUrl: string | undefined }) => {
  return (
    <Avatar className="w-full h-full">
      <AvatarImage src={profPicUrl} alt="profile pic" />
      <AvatarFallback>R</AvatarFallback>
    </Avatar>
  );
};

export default ProfilePic;
