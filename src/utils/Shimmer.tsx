const Shimmer = () => {
  return (
    <div className="animate-pulse p-4 space-y-4">
      <div className="h-6 w-3/4 bg-stone-500 rounded-md"></div>
      <div className="h-4 w-full bg-stone-500 rounded-md"></div>
      <div className="h-4 w-5/6 bg-stone-500 rounded-md"></div>
      <div className="h-4 w-2/3 bg-stone-500 rounded-md"></div>
      <div className="h-48 w-full bg-stone-500 rounded-xl mt-6"></div>
    </div>
  );
};

export default Shimmer;
