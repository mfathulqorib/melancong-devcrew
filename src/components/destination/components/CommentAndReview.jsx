import React from "react";
import { CommentCard } from "./CommentCard";
import { RatingCard } from "./RatingCard";

export const CommentAndReview = ({ comments, ratings, averageRate }) => {
  return (
    <div className="grid h-[290px] w-full grid-rows-5 gap-4">
      {/* Title */}
      <div className="row-span-1">
        <h1>Review</h1>
      </div>

      {/* Rating Card */}
      <RatingCard rate={averageRate} />

      {/* Comment And Rating Card */}
      <div className="row-span-3 flex h-full w-full gap-4 overflow-x-scroll">
        {/* Comment Card */}
        {comments.map(({ user, message, createdAt }, index) => {
          return (
            <CommentCard
              name={user.name}
              message={message}
              createdAt={createdAt}
              key={index}
            />
          );
        })}
        {/* rating Card */}
        {ratings.map(({ user, rate, createdAt }, index) => {
          return (
            <CommentCard
              name={user.name}
              rating={rate}
              createdAt={createdAt}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};