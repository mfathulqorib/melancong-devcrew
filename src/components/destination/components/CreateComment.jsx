"use client";
import React from "react";
import { Textarea, Button } from "@nextui-org/react";
import { useComment } from "../hooks/useComment";

export const CreateComment = ({ postId }) => {
  const { handleComment, isLoading } = useComment();

  return (
    <div className="mt-2  p-6">
      <form onSubmit={handleComment} className="space-y-3">
        <input name="postId" value={postId} className="hidden" />
        <Textarea
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
        />
        <Button
          color="primary"
          size="sm"
          className="font-medium"
          type="submit"
          isLoading={isLoading}
        >
          Kirim
        </Button>
      </form>
    </div>
  );
};
