import { AccountNavbar } from "@/components/AccountNavbar";
import { Footer } from "@/components/Footer";
import React from "react";

export const MyAccountLayout = ({ children }) => {
  return (
    <>
      <AccountNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
