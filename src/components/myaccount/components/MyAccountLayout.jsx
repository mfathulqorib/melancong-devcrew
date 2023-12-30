import { AccountNavbar } from "@/components/AccountNavbar";
import { Footer } from "@/components/Footer";
import { SECRET_KEY, TOKEN } from "@/utils/ApiUrl";
import { jwtExtract } from "@/utils/jwtExtract";
import { capitalizeEachWord, slugForUiApi } from "@/utils/sentenceTraversal";
import React from "react";

export const MyAccountLayout = ({ children }) => {
  const payload = jwtExtract(TOKEN, SECRET_KEY);
  const { name, username, email } = payload;

  return (
    <>
      <AccountNavbar
        name={capitalizeEachWord(name)}
        username={capitalizeEachWord(username)}
        slug={slugForUiApi(name)}
        email={email}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
};
