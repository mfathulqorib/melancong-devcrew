"use client";
import React, { useEffect, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import { useComment } from "../hooks/useComment";
import StarRating from "./StarRating";

export const CreateComment = ({
  postId,
  userId,
  selectedComment,
  setSelectedComment,
}) => {
  const { handleComment, handleEditComment, isLoading } = useComment();
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const isEditReview = Object.entries(selectedComment).length;
  const handleRate = (value) => {
    setRating(value);
    console.log(`Rated: ${rating}`);
  };

  useEffect(() => {
    if (isEditReview) {
      setMessage(selectedComment.message);
      setRating(selectedComment.rating);
    }
    if (!isEditReview) {
      setMessage("");
      setRating(0);
    }
  }, [selectedComment]);

  useEffect(() => {
    if (!isLoading) {
      setMessage("");
      setRating(0);
      setSelectedComment({});
    }
  }, [isLoading]);

  const handleReview = () => {
    if (isEditReview) {
      handleEditComment(selectedComment.id, message, rating);
    } else {
      handleComment(postId, message, rating);
    }
  };

  return (
    <>
      <div className="mt=-2 space-y-3 p-6">
        <label htmlFor="comment" className="font-semibold">
          {isEditReview ? "Edit" : "Masukkan"} ulasan kamu
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
        <div className="flex items-center">
          <Button
            color="primary"
            size="md"
            className="font-medium"
            isLoading={isLoading}
            isDisabled={!message.length}
            onClick={() => handleReview()}
          >
            {isEditReview ? "Edit" : "Kirim"}
          </Button>
          {isEditReview ? (
            <Button
              color="primary"
              variant="bordered"
              size="md"
              className="ml-2 font-medium"
              onClick={() => setSelectedComment({})}
            >
              Batal
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};
