import React from "react";
import { CommentCard } from "./CommentCard";

export const CommentAndReview = ({ comments, ratings }) => {
  return (
    <div className="grid h-[290px] w-full grid-rows-5 gap-4">
      {/* Title */}
      <div className="row-span-1">
        <h1>Review</h1>
      </div>

      {/* Rating Card */}
      <div className="row-span-1 flex gap-4 text-center">
        <div>4.5/5</div>
        <div>
          <h3>Bagus</h3>
          <p>Dari 1064 Review</p>
        </div>
      </div>

      {/* Comment And Rating Card */}
      <div className="row-span-3 flex h-full w-full gap-4 overflow-x-scroll">
        {/* Comment Card */}
        {comments.map(({ user, message, createdAt }) => {
          return (
            <CommentCard
              name={user.name}
              message={message}
              createdAt={createdAt}
            />
          );
        })}
        {/* rating Card */}
        {ratings.map(({ user, rate, createdAt }) => {
          return (
            <CommentCard name={user.name} rating={rate} createdAt={createdAt} />
          );
        })}
      </div>
    </div>
  );
};
