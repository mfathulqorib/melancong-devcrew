"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { travelService } from "@/services/TravelService";
import { toastStyle } from "@/utils/toastStyle";

export const useComment = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleComment = (postId, message, rating) => {
    setLoading(true);
    travelService
      .post("/comment", {
        message,
        postId,
        rating,
      })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          toast.success(response.data.message, toastStyle);
          router.refresh();
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`${error.response.data.error}`, toastStyle);
        console.log(error);
      });
  };

  const handleDeleteComment = (commentId) => {
    travelService
      .delete(`/comment?commentId=${commentId}`)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          toast.success(response.data.message, toastStyle);
          router.refresh();
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`${error.response.data.error}`, toastStyle);
        console.log(error);
      });
  };

  const handleRating = (postId, rate) => {
    travelService
      .post("/rating", {
        postId,
        rate,
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };
  return { handleComment, handleDeleteComment, handleRating, isLoading };
};
