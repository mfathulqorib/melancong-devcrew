"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { calculateStars } from "@/utils/CalculateStar";
import { numberWithCommas } from "@/utils/sentenceTraversal";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ReviewCard = ({ item }) => {
  const router = useRouter();
  const [totalStar, setTotalStar] = useState(
    calculateStars(item.averageRating),
  );
  const renderStars = () => {
    return totalStar.map((items, index) => <div key={index}>{items}</div>);
  };

  useEffect(() => {
    setTotalStar(calculateStars(item.averageRating));
  }, [item.averageRating]);

  return (
    <div
      onClick={() => {
        router.push(`/destination/${item.id}`);
      }}
      className="cursor-pointer"
    >
      <div className="h-full max-h-full min-w-[200px] rounded-lg bg-white shadow-md shadow-black/30 sm:min-w-[300px] ">
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
            className="transition-transform hover:scale-125"
          />
        </div>
        <div className="flex h-[55%] max-w-[200px] flex-col justify-between p-2 sm:h-[50%] sm:max-w-[300px]">
          <div className="flex flex-col gap-1 sm:gap-2">
            <div className=" truncate text-ellipsis text-sm font-semibold sm:text-base">
              {item.title}
            </div>
            <div className="flex">{renderStars()}</div>
            <p className="text-xs capitalize sm:text-sm">{item.city}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs text-slate-400 sm:text-sm">
              Harga tiket mulai dari...
            </div>
            <div className="flex justify-between">
              <div className="font-semibold text-[#f3706e] sm:text-lg">{`IDR ${numberWithCommas(
                item.budget,
              )}`}</div>
              <div className="flex items-center gap-1 text-sm font-medium text-gray-600 sm:gap-2 sm:text-base">
                <MessageCircle className="size-4 sm:size-5" />
                {item.comment.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
