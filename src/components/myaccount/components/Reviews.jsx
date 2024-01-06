"use client";
import React, { useEffect, useState } from "react";
import { NoReview } from "@/components/myaccount/components/icon/NoReview";
import { travelService } from "@/services/TravelService";
import { set } from "date-fns";
import { CommentCard } from "@/components/destination/components/CommentCard";

export const Reviews = ({ myReviews }) => {
  const EmptyState = () => {
    return (
      <>
        <div className="m-0 mx-auto w-fit">
          <NoReview />
        </div>
        <div className="mt-[-20px] text-center sm:mt-0">
          <p className=" text-lg font-semibold sm:text-xl">
            Belum ada review darimu, nih
          </p>
          <p className="mt-2 text-base sm:text-lg">
            Jangan lupa berikan review untuk destinasi yang pernah kamu
            kunjungi, ya!
          </p>
        </div>
      </>
    );
  };

  const renderReviews = () => {
    return (
      <div className="flex w-full justify-center">
        <div className="flex h-full w-fit flex-wrap items-center gap-4 py-2">
          {/* Comment Card */}
          {myReviews.map(({ id, post, message, createdAt }) => {
            return (
              <CommentCard
                name={post.title}
                message={message}
                createdAt={createdAt}
                key={id}
              />
            );
          })}
        </div>
      </div>
    );
  };

  // useEffect(() => {
  //   getReviews();
  // }, []);

  useEffect(() => {
    console.log(myReviews);
  }, [myReviews]);

  return (
    <>
      <h3 className="text-lg font-semibold sm:text-xl">Kumpulan Review-mu</h3>
      {myReviews.length ? renderReviews() : <EmptyState />}
    </>
  );
};
