"use client";

import { NextUIProvider } from "@nextui-org/react";
import { createContext, useEffect, useState } from "react";
import { getAllPosts, travelService } from "@/services/TravelService";

export const AppContext = createContext();
export const fakeRes = [
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
  console.log("test");
  const [allPosts, setAllPosts] = useState([]);

  async function getAllPosts() {
    try {
      const response = await travelService.get("/posts");
      if (response.status === 200) {
        setAllPosts(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    travelService.get("/posts").then(({ data }) => setAllPosts(data));
    getAllPosts().then((data) => setAllPosts(data));
    setAllPosts(getAllPosts());
  }, []);
  console.log(allPosts);
  console.count();

  return (
    <AppContext.Provider value={{ fakeRes }}>
      <NextUIProvider>
        <div>{children}</div>
      </NextUIProvider>
    </AppContext.Provider>
  );
};
