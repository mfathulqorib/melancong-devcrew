import { AccountNavbar } from "@/components/AccountNavbar";
import { Footer } from "@/components/Footer";
import { SECRET_KEY } from "@/utils/ApiUrl";
import { jwtExtract } from "@/utils/jwtExtract";
import { capitalizeEachWord, slugForUiApi } from "@/utils/sentenceTraversal";
import React from "react";
import { cookies } from "next/headers";

export const MyAccountLayout = ({ children }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token").value;
  const payload = jwtExtract(token, SECRET_KEY);
  const { name, username, email } = payload;

  return (
    <>
      <AccountNavbar
        name={capitalizeEachWord(name)}
        username={username}
        slug={slugForUiApi(name)}
        email={email}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
};
