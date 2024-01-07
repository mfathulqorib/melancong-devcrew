import React from "react";
import { Logo } from "./Logo";

export const HeaderLayout = ({ children }) => {
  return (
    <nav className="fixed left-0 top-0 z-[999] flex h-[50px] w-screen items-center justify-between bg-white px-[5vw] drop-shadow-md sm:h-[60px] sm:px-[10vw]">
      <Logo />
      {children}
    </nav>
  );
};
