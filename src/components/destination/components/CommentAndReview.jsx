"use client";

import React from "react";
import { CommentCard } from "./CommentCard";
import { RatingCard } from "./RatingCard";
import { CreateComment } from "./CreateComment";
import { NoReview } from "@/components/myaccount/components/icon/NoReview";
import {
  EMPTY_REVIEW_DESTINATION_P1,
  EMPTY_REVIEW_DESTINATION_P2,
} from "@/utils/constants";

export const CommentAndReview = ({ comments, averageRate, postId, userId }) => {
  const EmptyState = () => {
    return (
      <>
        <div className="m-0 mx-auto w-fit">
          <NoReview />
        </div>
        <div className="mt-[-20px] text-center sm:mt-0">
          <p className=" text-lg font-semibold sm:text-xl">
            {EMPTY_REVIEW_DESTINATION_P1}
          </p>
          <p className="mt-2 text-base sm:text-lg">
            {EMPTY_REVIEW_DESTINATION_P2}
          </p>
        </div>
      </>
    );
  };

  const renderReviews = () => {
    return (
      <div className="flex h-[300px] w-full flex-col gap-4 overflow-auto p-2">
        {/* Comment Card */}
        {comments?.map((item) => {
          return <CommentCard item={item} userId={userId} key={item.id} />;
        })}
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Title */}
      <div className=" text-xl font-semibold">
        <h1>Review</h1>
      </div>

      {/* Rating Card */}
      <RatingCard rate={averageRate} />

      {/* Comment And Rating Card */}
      {!comments.length ? <EmptyState /> : renderReviews()}
      {/* Create Comment */}
      <CreateComment postId={postId} userId={userId} />
    </div>
  );
};
