import AddReverie from "@/components/addReverie";
import Posts from "@/components/posts";
import SkeletonLoader from "@/components/skeleton";
import { Card } from "@/components/ui/card";
import { useFirebaseServices } from "@/stores/useFirebase";
import { useQuery } from "@tanstack/react-query";
import Notebook from "../assets/notebook.svg";

const HomePosts = () => {
  const { fetchPosts } = useFirebaseServices();

  const { isLoading, isSuccess } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false,
  });

  return (
    <div className=" w-full py-4 max-h-fit flex flex-col gap-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
      <img
        src={Notebook}
        alt="diary"
        className="w-[50%] sm:max-w-[30%] md:max-w-[40%] lg:max-w-[30%] xl:max-w-[20%] self-center"
      />
      <Card className="w-full p-4 shadow-md shadow-gray-200 dark:shadow-gray-700">
        <AddReverie />
      </Card>
      {isLoading && (
        <div className="flex flex-col gap-9">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index}>
              <SkeletonLoader />
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
