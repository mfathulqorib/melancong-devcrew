"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { calculateStars } from "@/utils/CalculateStar";

export const ReviewCard = ({ item }) => {
  const [totalStar, setTotalStar] = useState(
    calculateStars(item.averageRating),
  );

  useEffect(() => {
    setTotalStar(calculateStars(item.averageRating));
  }, [item.averageRating]);

  return (
    <div className="h-full min-w-[200px] rounded-lg bg-white shadow-md shadow-black/30 sm:min-w-[300px]">
      <div className="relative h-[45%] overflow-hidden rounded-t-lg sm:h-[50%]">
        <Image
          width={0}
          height={0}
          src={
            item?.postImage?.length
              ? `https://melancong-devcrew.s3.ap-southeast-1.amazonaws.com/posts/${item.id}/${item?.postImage[0]?.name}`
              : "/fake_image.avif"
          }
          sizes="50vw"
          alt="landing page photo"
          placeholder="empty"
          objectFit="cover"
          fill={true}
          loading="lazy"
        />
      </div>
      <div>{item.title}</div>
      <div className="flex">
        {totalStar.map((items, index) => {
          return <div key={index}>{items}</div>;
        })}
      </div>
    </div>
  );
};
