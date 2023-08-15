import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Notifications = () => {
  return (
    <div className="w-full flex flex-col gap-6">
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
        <CardContent className="text-muted-foreground">
          Thank you for registering to Reverie. If you see this notification,
          you are probably one of its first users.
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
