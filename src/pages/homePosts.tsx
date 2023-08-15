import AddReverie from "@/components/addReverie";
import Posts from "@/components/posts";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { db, useFirebaseServices } from "@/stores/useFirebase";
import { useQuery } from "@tanstack/react-query";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const HomePosts = () => {
  const { setPosts, currentUser, setSuccessFetch, setLoadingFetch, posts } =
    useFirebaseServices();

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
      if (currentUser) return unsubscribe;
    });
  };

  const { isLoading, isSuccess } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setSuccessFetch({ status: isSuccess });
    setLoadingFetch({ status: isLoading });
  }, [isSuccess, setSuccessFetch, isLoading, setLoadingFetch, posts]);
  return (
    <div className=" w-full py-4 max-h-fit flex flex-col gap-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
      <Card className="w-full p-4 shadow-md shadow-gray-200 dark:shadow-gray-700">
        <AddReverie />
      </Card>

      {isLoading && (
        <div className="flex flex-col gap-9">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 pl-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[220px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      )}
      {isSuccess && (
        <div className="w-full">
          <Posts />
        </div>
      )}
    </div>
  );
};

export default HomePosts;
