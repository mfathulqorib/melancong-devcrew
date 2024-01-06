"use client";
import React, { useState } from "react";
toast

export const useComment = () => {
  const [isLoading, setLoading] = useState(false);

  const handleComment = (event) => {
    event.preventDefault();
    setLoading(true);
    const formdata = new FormData();
  };
  return { handleComment, isLoading };
};
