import React from "react";
import { ReviewCard } from "./ReviewCard";
import { Header3 } from "./Header3";

const fakeRes = [
  {
    img: "/fake_image.avif",
    desc: "Gunung Bromo 1",
  },
  {
    img: "/fake_image.avif",
    desc: "Gunung Bromo 2",
  },
];

export const TrendingDestination = () => {
  return (
    <main className="my-2 px-[5vw] py-2 sm:my-4 sm:px-[10vw] ">
      <Header3 text={"🔥 Destinasi yang lagi tren"} />
      <section className="mt-2 flex h-[290px] w-full gap-3 overflow-x-auto px-1 py-2 sm:h-[370px] sm:gap-5">
        {fakeRes.map(({ img }, index) => {
          return <ReviewCard img={img} key={index} />;
        })}
      </section>
    </main>
  );
};
