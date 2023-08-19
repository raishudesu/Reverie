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
    <div className="w-full max-h-fit flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400">
      <Card className="border-b-0 flex justify-center py-2 h-32 bg-gradient-to-r rounded-b-none from-[#DEE4EA] to-[#F9FCFF] dark:from-[#28313B] dark:to-[#485461]">
        <img
          src={Notebook}
          alt="diary"
          className="w-[50%] sm:max-w-[30%] md:max-w-[40%] lg:max-w-[30%] xl:max-w-[20%] self-center"
        />
      </Card>
      <Card className="border-t-0 w-full p-4 shadow-md shadow-gray-200 dark:shadow-gray-700 rounded-t-none">
        <AddReverie />
      </Card>
      {isLoading && (
        <div className="flex flex-col gap-9 mt-6">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index}>
              <SkeletonLoader />
            </div>
          ))}
        </div>
      )}
      {isSuccess && (
        <div className="w-full mt-6">
          <Posts />
        </div>
      )}
    </div>
  );
};

export default HomePosts;
