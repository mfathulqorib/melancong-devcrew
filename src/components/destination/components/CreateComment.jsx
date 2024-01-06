"use client";
import React, { useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import { useComment } from "../hooks/useComment";

export const CreateComment = ({ postId }) => {
  const { handleComment, commentHandle } = useComment();

  return (
    <div className="mt-2  p-6">
      <form method="post" className="space-y-3">
        <Textarea
          name="message"
          onChange={commentHandle}
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
          onSubmit={() => handleComment(postId)}
        >
          Kirim
        </Button>
      </form>
    </div>
  );
};
