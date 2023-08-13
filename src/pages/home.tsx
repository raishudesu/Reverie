import AddReverie from "@/components/addReverie";
import Posts from "@/components/posts";
import { db, useFirebaseServices } from "@/stores/useFirebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import HomeSidePanel from "@/components/homeSidePanel";
import { Card } from "@/components/ui/card";

const Home = () => {
  const {
    successFetch,
    setPosts,
    currentUser,
    setSuccessFetch,
    setLoadingFetch,
  } = useFirebaseServices();

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

  useEffect(() => {
    setSuccessFetch({ status: isSuccess });
    setLoadingFetch({ status: isLoading });
  }, [isSuccess, setSuccessFetch, isLoading, setLoadingFetch]);

  return (
    <div className="w-full h-screen flex justify-center p-4 ">
      <div className="overflow-hidden w-full mt-16 max-h-fit md:w-[65%] flex justify-start shadow-md shadow-gray-200 dark:shadow-gray-700">
        <HomeSidePanel />
        <div className=" w-full max-h-fit flex flex-col items-center gap-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-black dark:scrollbar-thumb-white">
          <Card className="w-full p-4 shadow-md shadow-gray-200 dark:shadow-gray-700">
            <AddReverie />
          </Card>

          {successFetch && (
            <div className="w-full">
              <Posts />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
