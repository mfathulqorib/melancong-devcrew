"use client";
import React from "react";
import Link from "next/link";
import { NoReview } from "@/components/myaccount/components/icon/NoReview";
import { CommentCard } from "@/components/destination/components/CommentCard";
import {
  EMPTY_REVIEW_P1,
  EMPTY_REVIEW_P2,
  KUMPULAN_REVIEW,
} from "@/utils/constants";
import { useRouter } from "next/navigation";

export const Reviews = ({ myReviews }) => {
  const router = useRouter();
  const EmptyState = () => {
    return (
      <>
        <div className="m-0 mx-auto w-fit">
          <NoReview />
        </div>
        <div className="mt-[-20px] text-center sm:mt-0">
          <p className=" text-lg font-semibold sm:text-xl">{EMPTY_REVIEW_P1}</p>
          <p className="mt-2 text-base sm:text-lg">{EMPTY_REVIEW_P2}</p>
        </div>
      </>
    );
  };

  const renderReviews = () => {
    return (
      <div className="">
        <div className="flex h-[360px] w-full flex-col gap-4 overflow-auto p-2">
          {/* Comment Card */}
          {myReviews.map((item) => {
            return (
              <div
                className="cursor-pointer"
                key={item.id}
                onClick={() => {
                  router.push(`/destination/${item.postId}`);
                }}
              >
                <CommentCard item={item} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <h3 className="mb-2 text-lg font-semibold sm:text-xl">
        {KUMPULAN_REVIEW}
      </h3>
      {myReviews.length ? renderReviews() : <EmptyState />}
    </>
  );
};
