"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HeroText } from "./HeroText";
import { HeroHeader } from "./HeroHeader";
import { SearchIcon } from "./icon/SearchIcon";

export const Hero = () => {
  return (
    <div
      id="hero"
      className="relative block overflow-hidden pt-[50px] sm:pt-[60px] sm:mt-[0px] "
    >
      <div className="absolute -z-50 box-border h-full w-full bg-[url('/bg_hero_5.png')] bg-cover bg-[center_top_30%]">
      </div>
      <div className="z-10 h-[260px] w-full px-6 py-4 sm:h-[360px] sm:py-8">
        <section className=" flex h-full flex-col items-center justify-between gap-5 text-center">
          <HeroHeader />
          <div className="flex flex-col items-center gap-3 sm:gap-5">
            <div className="flex w-[200px] items-center gap-3 rounded-3xl bg-white px-4 py-2 text-gray-500 sm:w-[360px]">
              <SearchIcon />
              <input
                type="text"
                name="filtered-location"
                autoComplete="filtered-location"
                placeholder="Jakarta"
                // onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full px-3 text-sm focus:outline-none sm:text-base"
              />
            </div>
            <Link href={"#all-events"}>
              <Button
                variant="solid"
                color="primary"
                className=" h-fit px-8 py-2 text-sm font-semibold text-white sm:px-10  sm:text-base"
              >
                Explore
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
