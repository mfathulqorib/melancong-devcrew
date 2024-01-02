import React from "react";
import { LogoFooter } from "./Logo";

export const Footer = () => {
  return (
    <footer id="footer" className="h-[50px] px-[5vw] sm:h-[60px] sm:px-[10vw] ">
      <div className="flex h-full items-center justify-between border-t-1 border-dotted border-black">
        <p className="py-2 text-xs sm:py-4 sm:text-base">
          2023 - 2024 Devcrew, with support from Devscale Indonesia. Made with
          ❤️
        </p>
        <LogoFooter />
      </div>
    </footer>
  );
};
