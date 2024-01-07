import Date from "@/utils/Date";
import { Card } from "@nextui-org/react";
import React from "react";

export const CommentCard = ({ name, message, createdAt, rating }) => {
  return (
    <div className="w-full rounded-lg p-3 shadow-md">
      {/* Name and Date Section */}
      <div className="flex justify-between">
        <div className="max-w-[80%] ">
          <h3 className="truncate text-ellipsis text-base font-semibold capitalize text-black">
            {name}
          </h3>
        </div>
        <div className="text-sm font-medium text-slate-400">
          <Date dateString={createdAt} />
        </div>
      </div>

      {/* Comment and rating section */}
      <div className="mt-5">
        {message ? (
          <div>
            <p className="text-sm font-normal text-slate-800">{message}</p>
          </div>
        ) : (
          <div>
            <p className="text-xl text-slate-400">
              <span className="text-3xl font-semibold text-slate-800">
                {rating}
              </span>
              /5
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
