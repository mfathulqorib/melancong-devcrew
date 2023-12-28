"use client";

import { NextUIProvider } from "@nextui-org/react";
import { createContext } from "react";

export const AppContext = createContext();
const fakeRes = [
  {
    img: "/fake_image.avif",
    name: "Gunung Bromo 1",
  },
  {
    img: "/fake_image.avif",
    name: "Gunung Bromo 2",
  },
  {
    img: "/fake_image.avif",
    name: "Gunung Bromo 3",
  },
  {
    img: "/fake_image.avif",
    name: "Gunung Bromo 4",
  },
  {
    img: "/fake_image.avif",
    name: "Gunung Bromo 5",
  },
  {
    img: "/fake_image.avif",
    name: "Gunung Bromo 6",
  },
];

export const Provider = ({ children }) => {
  return (
    <AppContext.Provider value={{ fakeRes }}>
      <NextUIProvider>
        <div>{children}</div>
      </NextUIProvider>
    </AppContext.Provider>
  );
};
