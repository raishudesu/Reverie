import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LiaCopyright } from "react-icons/lia";
import { useFirebaseServices } from "@/stores/useFirebase";
import EditEmailDialog from "@/components/editEmailDialog";
import UpdatePwdDialog from "@/components/updatePwdDialog";
import DeleteAccDialog from "@/components/deleteAccDialog";
import ProfilePic from "@/components/profilePic";
import EasterEgg from "@/components/easterEgg";

const Settings = () => {
  const { currentUser, username, profilePicUrl } = useFirebaseServices();
  const provider = currentUser?.providerData[0].providerId;
  return (
    <div className="w-full h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
      <div className="h-full flex flex-col justify-between">
        <Card className="border-b-0 h-32 bg-gradient-to-r rounded-b-none from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]"></Card>
        <Card className="border-t-0 rounded-t-none h-full">
          <CardHeader className="flex flex-row justify-start items-center gap-2 ">
            <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
              <ProfilePic profPicUrl={profilePicUrl} />
            </div>
            <CardTitle className="font-bold">Account settings</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground flex flex-col justify-start items-start gap-6">
            <div className="text-sm flex flex-col gap-2">
              <div className="text-lg font-bold">Account information</div>
              <div>Username: {username}</div>
              <div>Email: {currentUser?.email}</div>
              <div>User ID: {currentUser?.uid}</div>
            </div>
            <div className="flex flex-col items-start">
              {provider === "google.com" ? (
                <p className="text-sm text-muted-foreground mb-4">
                  Note: Google account is used. Cannot change email and
                  password.
                </p>
              ) : null}
              <EditEmailDialog />
              <UpdatePwdDialog />
              <DeleteAccDialog />
            </div>
          </CardContent>
        </Card>
        <div className="w-full flex flex-col items-center gap-2 text-muted-foreground text-sm p-4">
          <div className="flex gap-1 items-center font-bold">
            <LiaCopyright /> <EasterEgg />
          </div>
          <p>All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
