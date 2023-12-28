"use client";

import React, { useContext } from "react";
import { ReviewCard } from "./ReviewCard";
import { Header3 } from "./Header3";
import { AppContext } from "@/components/providers";

export const TopRateDestination = () => {
  const { fakeRes } = useContext(AppContext);

  return (
    <main className="my-2 px-[5vw] py-2 sm:my-4 sm:px-[10vw] ">
      <Header3 text={"⭐ Destinasi dengan rating tertinggi"} />
      <section className="mt-2 flex h-[290px] w-full gap-3 overflow-x-auto px-1 py-2 sm:h-[370px] sm:gap-5">
        {fakeRes.map(({ img, name }, index) => {
          return <ReviewCard img={img} name={name} key={index} />;
        })}
      </section>
    </main>
  );
};
