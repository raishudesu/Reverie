import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Welcome from "../assets/welcome.svg";

const Notifications = () => {
  return (
    <div className="w-full flex flex-col gap-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
      <div>
        <Card className="h-32 bg-gradient-to-r rounded-b-none from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]"></Card>
        <Card className="rounded-t-none">
          <CardHeader className="flex flex-col justify-center items-start ">
            <CardTitle className="font-bold">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Be notified for updates and changes within Reverie.
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-t-none">
        <CardHeader className="flex flex-col justify-center items-start ">
          <CardTitle>Welcome to Reverie!</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex flex-col gap-4">
          Thank you for registering to Reverie. If you see this notification,
          you are probably one of its first users.
          <img
            src={Welcome}
            alt=""
            className="w-[50%] sm:max-w-[30%] md:max-w-[40%] lg:max-w-[30%] xl:max-w-[20%] self-center"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
