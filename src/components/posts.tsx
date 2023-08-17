import { useFirebaseServices } from "@/stores/useFirebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Timestamp } from "firebase/firestore";
import { AiOutlineUser } from "react-icons/ai";
import UpdatePostDialog from "./updatePostDialog";
import DeletePostDialog from "./deletePostDialog";
import moment from "moment";

const Posts = () => {
  const { posts } = useFirebaseServices();

  return (
    <>
      <div className="flex flex-col-reverse items-center gap-6">
        {posts.length !== 0 ? (
          posts.map(
            (
              {
                content,
                created_at,
                postId,
                editedAt,
              }: {
                content: string;
                created_at: Timestamp;
                postId: number;
                editedAt: Timestamp | undefined;
              },
              index: number
            ) => {
              // Convert Firebase Timestamp to string
              const createdAtString = moment.unix(created_at.seconds).fromNow();
              const editedAtString = moment
                .unix(editedAt?.seconds as number)
                .fromNow();

              return (
                <Card key={postId} className="w-full flex flex-col items-start">
                  <CardHeader className="w-full">
                    <CardTitle className="flex justify-between items-center">
                      Entry #{index + 1}
                      <div className="rounded-full p-4 bg-gradient-to-r from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]">
                        <AiOutlineUser size={20} />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-md break-all">
                      {content}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="text-xs text-gray-500 flex justify-between w-full flex-wrap">
                    <div className="flex flex-col gap-1 ">
                      <div>Posted {createdAtString}</div>
                      {editedAt ? <div>Edited {editedAtString}</div> : null}
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
