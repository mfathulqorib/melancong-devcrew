"use client";

import { API_URL } from "@/utils/ApiUrl";
import { useState } from "react";
import toast from "react-hot-toast";

export const useComment = () => {
  const [isLoading, setLoading] = useState(false);
  const [messages, setMessages] = useState("");

  const commentHandle = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setMessages(e.target.value);
  };

  console.log(`iki message : ${messages}`);

  const handleComment = async (postId, e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${API_URL}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messages,
          postId,
        }),
      });
      console.log("sukses!!");
    } catch (error) {
      console.log(error);
    }
  };
  return { handleComment, isLoading, commentHandle };
};
