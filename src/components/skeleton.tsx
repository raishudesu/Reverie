import { Skeleton } from "./ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex items-center space-x-4 pl-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[220px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
