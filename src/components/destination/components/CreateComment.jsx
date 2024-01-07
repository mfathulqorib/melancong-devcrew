"use client";
import React, { useEffect, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import { useComment } from "../hooks/useComment";
import StarRating from "./StarRating";

export const CreateComment = ({ postId, userId }) => {
  const { handleComment, isLoading } = useComment();
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const handleRate = (value) => {
    setRating(value);
    console.log(`Rated: ${rating}`);
  };

  useEffect(() => {
    if (!isLoading) {
      setMessage("");
      setRating(0);
    }
  }, [isLoading]);

  const handleReview = () => {
    handleComment(postId, message, rating);
  };

  return (
    <>
      <div className="mt=-2 space-y-3 p-6">
        <label htmlFor="comment" className="font-semibold">
          Masukkan ulasan kamu
        </label>
        <div className="mb-4 flex">
          <StarRating
            onRate={handleRate}
            rating={rating}
            setRating={setRating}
          />
        </div>
        <Textarea
          id="comment"
          value={message}
          name="message"
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
          size="md"
          className="font-medium"
          isLoading={isLoading}
          isDisabled={!message.length}
          onClick={() => handleReview()}
        >
          Kirim
        </Button>
      </div>
    </>
  );
};
