import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HeroText } from "./HeroText";
import { HeroHeader } from "./HeroHeader";

export const Hero = () => {
  return (
    <div className="relative mt-[56px] block ">
      <div className="absolute -z-50 box-border h-full w-full bg-[url('/bg_hero_5.png')] bg-cover bg-[center_top_30%]">
        {/* <Image
          src="/bg_hero_2.avif"
          fill
          className="object-cover"
          alt=""
          objectFit="cover"
          // objectPosition="0% 50%"
          priority
        /> */}
      </div>
      <div className="z-10 h-[400px] w-full px-6 py-8 sm:p-10">
        <section className=" flex h-full flex-col items-center justify-between gap-5 text-center">
          <HeroHeader />
          {/* <HeroText /> */}
          <div>
            <Link href={"#all-events"}>
              <Button>Explore</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
