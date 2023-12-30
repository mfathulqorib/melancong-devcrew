"use client";

import React, { useContext } from "react";
import { ReviewCard } from "./ReviewCard";
import { Header3 } from "./Header3";
import { AppContext } from "@/components/providers";
import FuzzySearch from "fuzzy-search";

export const AfordableDestination = () => {
  const { affordableDestination } = useContext(AppContext);

  return (
    <main className="my-2 px-[5vw] py-2 sm:my-4 sm:px-[10vw] ">
      <Header3 text={"💸 Destinasi hemat anti penat"} />
      <section className="mt-2 flex h-[290px] w-full gap-3 overflow-x-auto px-1 py-2 sm:h-[370px] sm:gap-5">
        {affordableDestination.map((item) => {
          return <ReviewCard item={item} key={item.id} />;
        })}
      </section>
    </main>
  );
};
