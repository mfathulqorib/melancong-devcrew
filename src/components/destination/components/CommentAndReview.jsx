"use client";

import React from "react";
import { CommentCard } from "./CommentCard";
import { RatingCard } from "./RatingCard";
import { CreateComment } from "./CreateComment";

export const CommentAndReview = ({
  comments,
  ratings,
  averageRate,
  postId,
}) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Title */}
      <div className=" text-xl font-semibold">
        <h1>Review</h1>
      </div>

      {/* Rating Card */}
      <RatingCard rate={averageRate} />

      {/* Comment And Rating Card */}
      <div className="flex h-[300px] w-full flex-col gap-4 overflow-auto p-2">
        {/* Comment Card */}
        {comments?.map(({ id, user, message, createdAt }) => {
          return (
            <CommentCard
              commentId={id}
              name={user.name}
              message={message}
              createdAt={createdAt}
              key={id}
            />
          );
        })}

        {/* rating Card */}
        {/* {ratings?.map(({ user, rate, createdAt }, index) => {
          return (
            <CommentCard
              name={user.name}
              rating={rate}
              createdAt={createdAt}
              key={index}
            />
          );
        })} */}
      </div>

      {/* Create Comment */}
      <CreateComment postId={postId} />
    </div>
  );
};
