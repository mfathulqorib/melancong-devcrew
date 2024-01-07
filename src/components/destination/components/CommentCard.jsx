"use client";

import Date from "@/utils/Date";
import React, { useEffect, useState } from "react";
import { useComment } from "../hooks/useComment";
import { TimeAgo } from "@/utils/timeAgo";
import { Trash2 } from "lucide-react";
import { calculateStars } from "@/utils/CalculateStar";

export const CommentCard = ({ item, userId, setSelectedComment }) => {
  const {
    id,
    user: { name } = {},
    post: { title } = {},
    message,
    createdAt,
    rating,
    updatedAt,
  } = item;
  const { handleDeleteComment } = useComment();
  const [totalStar, setTotalStar] = useState(calculateStars(rating));
  const renderStars = () => {
    return totalStar.map((items, index) => <div key={index}>{items}</div>);
  };
  const handleOnClickEdit = () => {
    setSelectedComment(item);
  };
  const isEdited = createdAt !== updatedAt;

  useEffect(() => {
    setTotalStar(calculateStars(rating));
  }, [rating]);

  return (
    <div className="flex min-h-[140px] w-full flex-col justify-between rounded-lg p-3 shadow-md">
      {/* Name and Date Section */}
      <div className="flex justify-between">
        <div className="max-w-[80%] space-y-1">
          <h3 className="truncate text-ellipsis text-base font-semibold capitalize text-black">
            {name || title}
          </h3>
          <div className="flex">{renderStars()}</div>
        </div>
        <div className="flex flex-col items-end text-sm font-medium text-slate-400">
          <TimeAgo createdAt={createdAt} />
          <Date dateString={createdAt} />
        </div>
      </div>

      {/* Comment and rating section */}
      <div className="flex items-end justify-between">
        <div className="mt-5 min-h-[50px]">
          <div>
            <p className="text-sm font-normal text-slate-800">
              {message}
              {isEdited ? (
                <span className="text-xs text-slate-500">{" (edited)"}</span>
              ) : null}
            </p>
          </div>
        </div>
        {userId && userId === item.user.id ? (
          <div className="flex  gap-x-4 ">
            <p
              className=" cursor-pointer text-end font-medium text-[#0066ff] hover:text-[#6ea5f9]"
              onClick={() => handleOnClickEdit()}
            >
              Edit
            </p>
            <Trash2
              className="cursor-pointer text-red-500 hover:text-red-400"
              onClick={() => handleDeleteComment(id)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
