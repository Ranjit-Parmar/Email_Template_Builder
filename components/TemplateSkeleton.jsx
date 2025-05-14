import { Skeleton } from "@/components/ui/skeleton";

const TemplateSkeleton = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow animate-pulse"
        >
          <Skeleton className="h-[150px] w-full rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateSkeleton;
