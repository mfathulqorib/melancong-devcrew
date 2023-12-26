import React from "react";
import { Logo } from "./Logo";
import { Button, Link } from "@nextui-org/react";

export const Header = () => {
  return (
    <nav className="fixed left-0 top-0 z-[9999] flex h-[50px] w-screen items-center justify-between px-[5vw] drop-shadow-md sm:h-[60px] sm:px-[10vw] ">
      <Logo />
      <div>
        <Button
          as={Link}
          color="primary"
          href="#"
          variant="flat"
          className="h-fit px-4 py-2 text-xs sm:text-sm"
        >
          Sign Up
        </Button>
      </div>
    </nav>
  );
};
