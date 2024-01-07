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

export const Reviews = ({ myReviews }) => {
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
      <div className="flex w-full justify-center">
        <div className="flex h-full w-fit flex-wrap items-center gap-4 py-2">
          {/* Comment Card */}
          {myReviews.map(({ id, post, message, createdAt, postId }) => {
            return (
              <Link href={`/destination/${postId}#reviews`}>
                <CommentCard
                  name={post.title}
                  message={message}
                  createdAt={createdAt}
                  key={id}
                />
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <h3 className="text-lg font-semibold sm:text-xl">{KUMPULAN_REVIEW}</h3>
      {myReviews.length ? renderReviews() : <EmptyState />}
    </>
  );
};
