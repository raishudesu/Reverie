import { useQuery } from "@tanstack/react-query";
import { db, useFirebaseServices } from "@/stores/useFirebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Card, CardDescription, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const Posts = () => {
  const { posts, setPosts, currentUser } = useFirebaseServices();

  const uid = currentUser?.uid;

  const postsRef = collection(db, `users/${uid}/posts`);

  const fetchPosts = () => {
    return new Promise((resolve) => {
      const unsubscribe = onSnapshot(postsRef, (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => doc.data());
        setPosts({ posts: fetchedPosts }); // Update the posts in the state
        resolve(fetchedPosts);
      });

      // Unsubscribe from the listener when component unmounts
      return unsubscribe;
    });
  };

  const { isLoading, isSuccess } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {isLoading ? (
        <div className="w-full flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : null}
      {isSuccess &&
        posts.map(({ content }: { content: string }, index: number) => {
          return (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardDescription className="text-md">{content}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
    </>
  );
};

export default Posts;
