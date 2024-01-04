import React from "react";
import { Button } from "@nextui-org/react";
import { HeaderLayout } from "./HeaderLayout";
import Link from "next/link";

import { AccountNavbar } from "@/components/AccountNavbar";
import { SECRET_KEY } from "@/utils/ApiUrl";
import { jwtExtract } from "@/utils/jwtExtract";
import { capitalizeEachWord, slugForUiApi } from "@/utils/sentenceTraversal";
import { cookies } from "next/headers";

export const Header = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <HeaderLayout>
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
  } else {
    const payload = jwtExtract(token, SECRET_KEY);
    const { name, username, email } = payload;

    return (
      <HeaderLayout>
        <AccountNavbar
          name={capitalizeEachWord(name)}
          username={username}
          slug={slugForUiApi(name)}
          email={email}
        />
      </HeaderLayout>
    );
  }
};
