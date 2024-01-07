import React from "react";
import Image from "next/image";

export const PerformaReview = ({ totalReviews }) => {
  return (
    <>
      <div className="mt-1 rounded-lg p-3 text-center shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_2px_-2px_2px_0px] sm:mt-3 ">
        <h3 className="mb-2 text-sm font-semibold">Performa Review-mu</h3>
        <div className="flex flex-col items-center gap-1">
          <div className="size-10">
            <Image
              alt="review-icon"
              src={"/icon_review.png"}
              className="h-full w-full"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">{totalReviews}</p>
            <p className="text-xs">Total Review</p>
          </div>
        </div>
      </div>
    </>
  );
};
