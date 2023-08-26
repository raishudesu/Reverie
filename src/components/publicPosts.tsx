import { useFirebaseServices } from "@/stores/useFirebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import ProfilePic from "./profilePic";

const PublicPosts = () => {
  const { pblcPosts } = useFirebaseServices();
  return (
    <>
      <div className="flex flex-col-reverse items-center gap-2">
        {pblcPosts.map(
          ({
            content,
            created_at,
            postId,
            authorUsername,
            profPicUrl,
          }: {
            content: string;
            created_at: Timestamp;
            postId: number;
            editedAt: Timestamp | undefined;
            authorUsername: string;
            profPicUrl: string | undefined;
          }) => {
            // Convert Firebase Timestamp to string
            const createdAtString = moment.unix(created_at.seconds).fromNow();
            /* const editedAtString = moment
              .unix(editedAt?.seconds as number)
              .fromNow(); */

            return (
              <Card key={postId} className="w-full flex">
                <CardHeader className="px-0 pl-4">
                  <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
                    <ProfilePic profPicUrl={profPicUrl} />
                  </div>
                </CardHeader>
                <Card className="w-full flex flex-col items-start border-none">
                  <CardHeader className="w-full pb-2 font-bold">
                    {authorUsername}
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-md break-all">
                      {content}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="text-xs text-gray-500 flex justify-between w-full flex-wrap">
                    <div className="flex flex-col gap-1 ">
                      <div>Posted {createdAtString}</div>
                    </div>
                  </CardFooter>
                </Card>
              </Card>
            );
          }
        )}
      </div>
    </>
  );
};

export default PublicPosts;
