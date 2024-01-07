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

  const handleEditComment = (commentId, message, rating) => {
    setLoading(true);
    travelService
      .put(`/comment?commentId=${commentId}`, {
        message,
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

  return { handleComment, handleDeleteComment, handleEditComment, isLoading };
};
