import { Star } from "lucide-react";
import React, { useState } from "react";

export default function StarRating({ onRate }) {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    const newRating = value === rating ? 0 : value;
    setRating(newRating);
    onRate(newRating);
  };

  return (
    <>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          fill={value <= rating ? "#6d798c" : "none"}
          stroke="#6d798c"
          className="size-5 cursor-pointer sm:size-6"
          onClick={() => handleStarClick(value)}
        />
      ))}
    </>
  );
}
