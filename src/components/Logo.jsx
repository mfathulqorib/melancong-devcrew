import React from "react";
import { Lobster as FontLogo } from "next/font/google";

const fontLogo = FontLogo({ subsets: ["latin"], weight: ["400"] });

export const Logo = () => {
  return (
    <div className={`${fontLogo.className} text-xl text-[#0066ff] sm:text-3xl`}>
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
