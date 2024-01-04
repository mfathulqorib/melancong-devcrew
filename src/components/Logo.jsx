import React from "react";
import { Lobster as FontLogo } from "next/font/google";
import Link from "next/link";

const fontLogo = FontLogo({ subsets: ["latin"], weight: ["400"] });

export const Logo = () => {
  return (
    <Link href="/">
      <div
        className={`${fontLogo.className} text-xl text-[#0066ff] sm:text-3xl`}
      >
        Melancong
      </div>
    </Link>
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
