const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      {...props}
    />
  );
};

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
    <Skeleton className="h-6 w-3/4 mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-5/6 mb-4" />
    <Skeleton className="h-10 w-full" />
  </div>
);

export const SkeletonStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-xl p-6">
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-4 w-24" />
      </div>
    ))}
  </div>
);

export const SkeletonProfile = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
    <div className="text-center mb-8">
      <Skeleton className="h-32 w-32 rounded-full mx-auto mb-4" />
      <Skeleton className="h-8 w-48 mx-auto mb-2" />
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
    <SkeletonStats />
  </div>
);

export default Skeleton;
