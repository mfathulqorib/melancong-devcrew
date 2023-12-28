import React from "react";
import Image from "next/image";

export const ReviewCard = ({ img, name }) => {
  return (
    <div className="h-full min-w-[200px] rounded-lg bg-white shadow-md shadow-black/30 sm:min-w-[300px]">
      <div className="relative h-[45%] overflow-hidden rounded-t-lg border-b-1 border-black sm:h-[50%]">
        <Image
          width={0}
          height={0}
          src={img}
          sizes="50vw"
          alt="landing page photo"
          placeholder="blur"
          blurDataURL="/fake_image.avif"
          objectFit="cover"
          fill={true}
          priority
        />
      </div>
      <div>{name}</div>
    </div>
  );
};
