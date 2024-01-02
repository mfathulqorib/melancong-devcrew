import React from "react";

export const HeaderLayout = ({ children }) => {
  return (
    <nav className="fixed left-0 top-0 z-[9999] flex h-[50px] w-screen items-center justify-between bg-white px-[5vw] drop-shadow-md sm:h-[60px] sm:px-[10vw]">
      {children}
    </nav>
  );
};
