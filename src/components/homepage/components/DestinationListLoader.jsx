import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const DestinationListLoader = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="h-full max-h-full min-w-[200px] rounded-lg bg-white shadow-md shadow-black/30 sm:min-w-[300px]"
        >
          <Skeleton className="h-[45%] overflow-hidden rounded-t-lg sm:h-[50%]" />
          <div className="mt-2 h-[15%] px-2 pb-4 sm:h-[20%]">
            <Skeleton className="h-full" />
          </div>
          <div className="mt-2 h-[15%] w-[65%] px-2 pt-4 sm:h-[20%]">
            <Skeleton className="h-full " />
          </div>
        </div>
      ))}
    </>
  );
};
