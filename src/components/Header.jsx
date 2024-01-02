import React from "react";
import { Logo } from "./Logo";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { HeaderLayout } from "./HeaderLayout";

export const Header = () => {
  return (
    <HeaderLayout>
      <Link href="/">
        <Logo />
      </Link>
      <Link href="/login">
        <Button
          color="primary"
          variant="flat"
          className="h-fit px-4 py-2 text-xs sm:text-sm"
        >
          Sign In
        </Button>
      </Link>
    </HeaderLayout>
  );
};
