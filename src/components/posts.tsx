import { useFirebaseServices } from "@/stores/useFirebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Timestamp } from "firebase/firestore";
import { AiOutlineUser } from "react-icons/ai";
import DeleteDialog from "./deleteDialog";
import UpdateDialog from "./updateDialog";

const Posts = () => {
  const { posts, successFetch } = useFirebaseServices();

  return (
    <>
      <div className="flex flex-col-reverse gap-6 ">
        {successFetch ? (
          posts.map(
            ({
              content,
              created_at,
              postId,
            }: {
              content: string;
              created_at: Timestamp;
              postId: number;
            }) => {
              // Convert Firebase Timestamp to string
              const createdAtString = created_at.toDate().toLocaleString();

              return (
                <Card key={postId} className="w-full flex flex-col items-start">
                  <div className="rounded-full mt-4 ml-5 p-2 bg-gradient-to-r from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]">
                    <AiOutlineUser size={20} />
                  </div>
                  <CardHeader>
                    <CardTitle>Reverie {postId}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-md break-all">
                      {content}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="text-xs text-gray-500 flex justify-between w-full flex-wrap">
                    <div>Posted at: {createdAtString}</div>
                    <div className="flex items-center gap-3">
                      <UpdateDialog postId={postId} currentContent={content} />
                      <DeleteDialog postId={postId} />
                    </div>
                  </CardFooter>
                </Card>
              );
            }
          )
        ) : (
          <div className="w-full flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
