"use client";
import React, { useEffect, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import { useComment } from "../hooks/useComment";

export const CreateComment = ({ postId }) => {
  const { handleComment, isLoading } = useComment();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
    console.log(isLoading);
  }, [isLoading]);

  return (
    <div className="mt-2 space-y-3 p-6">
      {/* <form onSubmit={handleComment} className="space-y-3"> */}
      {/* <input name="postId" value={postId} className="hidden" disabled /> */}
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
        // onClick={handleComment}
      >
        Kirim
      </Button>
      {/* </form> */}
    </div>
  );
};
