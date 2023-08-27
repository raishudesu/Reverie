import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Timestamp } from "firebase/firestore";
import UpdatePostDialog from "./updatePostDialog";
import DeletePostDialog from "./deletePostDialog";
import moment from "moment";
import ProfilePic from "./profilePic";
import PostDateTooltip from "./postDateTooltip";
import { useFirebaseServices } from "@/stores/useFirebase";

const Posts = () => {
  const { userPosts, profilePicUrl } = useFirebaseServices();

  return (
    <>
      <div className="flex flex-col-reverse items-center gap-2">
        {userPosts.length !== 0 ? (
          userPosts.map(
            (
              {
                content,
                created_at,
                postId,
                authorUsername,
                display,
              }: {
                content: string;
                created_at: Timestamp;
                postId: number;
                editedAt: Timestamp | undefined;
                authorUsername: string;
                authorId: number;
                display: string;
                userAddress: string;
              },
              index: number
            ) => {
              // Convert Firebase Timestamp to string
              const createdAtString = moment.unix(created_at.seconds).fromNow();
              /*  const editedAtString = moment
                .unix(editedAt?.seconds as number)
                .fromNow(); */

              return (
                <Card key={index} className="w-full flex">
                  <CardHeader className="px-0 pl-4">
                    <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
                      <ProfilePic profPicUrl={profilePicUrl} />
                    </div>
                  </CardHeader>
                  <Card className="w-full flex flex-col items-start border-none">
                    <CardHeader className="w-full flex flex-row justify-between pb-2 font-bold">
                      {authorUsername}
                      <span className="font-normal text-xs text-muted-foreground capitalize">
                        {display}
                      </span>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-md break-all">
                        {content}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground flex justify-between w-full flex-wrap">
                      <div className="flex gap-1 ">
                        <PostDateTooltip
                          memoStr={createdAtString}
                          date={created_at}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <UpdatePostDialog
                          postId={postId}
                          currentContent={content}
                        />
                        <DeletePostDialog postId={postId} />
                      </div>
                    </CardFooter>
                  </Card>
                </Card>
              );
            }
          )
        ) : (
          <div className="text-muted-foreground">Post your first Reverie.</div>
        )}
      </div>
    </>
  );
};

export default Posts;
