"use client";

import { API_URL } from "@/utils/ApiUrl";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useComment = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleComment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    const postId = e.target.postId.value;
    const message = e.target.message.value;

    formData.append("postId", postId);
    formData.append("message", message);

    try {
      await fetch(`${API_URL}/comment`, {
        method: "POST",
        body: JSON.stringify({
          message,
          postId,
        }),
      });
      toast.success("Komentar sukses terkirim");
      setLoading(false);
      setTimeout(() => router.refresh(), 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return { handleComment, isLoading };
};
