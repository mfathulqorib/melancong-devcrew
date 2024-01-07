"use client";
import React, { useEffect, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import { useComment } from "../hooks/useComment";
import StarRating from "./StarRating";

export const CreateComment = ({ postId, userId }) => {
  const { handleComment, isLoading } = useComment();
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");
  const handleRate = (value) => {
    setRating(value);
    console.log(`Rated: ${rating}`);
  };

  useEffect(() => {
    setMessage("");
    console.log(isLoading);
  }, [isLoading]);

  return (
    <>
      <div className="mt-2 space-y-3 p-6">
        <div className="flex">
          <StarRating onRate={handleRate} />
        </div>
        <Textarea
          value={message}
          name="message"
          label="Komentar"
          variant="underlined"
          placeholder="Tulis Komentar..."
          disableAnimation
          disableAutosize
          classNames={{
            base: "max-w-full",
            input: "resize-y min-h-[40px] ",
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button
          color="primary"
          size="sm"
          className="font-medium"
          type="submit"
          isLoading={isLoading}
          onClick={() => {
            handleComment(postId, message);
          }}
        >
          Kirim
        </Button>
      </div>
    </>
  );
};
