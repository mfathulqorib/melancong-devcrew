"use client";
import React from "react";
import { Lobster as FontLogo } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

const fontLogo = FontLogo({ subsets: ["latin"], weight: ["400"] });

export const Logo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/");
      }}
      className={`${fontLogo.className} cursor-pointer text-xl text-[#0066ff] sm:text-3xl`}
    >
      Melancong
    </div>
  );
};

export const LogoFooter = () => {
  return (
    <div
      className={`${fontLogo.className} text-base text-[#0066ff] sm:text-xl`}
    >
      Melancong
    </div>
  );
};
