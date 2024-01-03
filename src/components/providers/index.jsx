"use client";

import { NextUIProvider } from "@nextui-org/react";
import { createContext, useEffect, useState } from "react";
import { travelService } from "@/services/TravelService";
import { Search } from "@/lib/Search";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export const AppContext = createContext();

export const Provider = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  const [affordableDestination, setAffordableDestination] = useState([]);
  const [topRateDestination, setTopRateDestination] = useState([]);
  const [trendingDestination, setTrendingDestination] = useState([]);
  const querySearch = ["city", "title"];
  const router = useRouter();

  const initData = () => {
    travelService
      .get("/posts")
      .then(({ data }) => {
        setAffordableDestination(
          data.data.slice().sort((a, b) => a.budget - b.budget),
        );
        setTopRateDestination(
          data.data.slice().sort((a, b) => b.averageRating - a.averageRating),
        );
        setTrendingDestination(
          data.data.slice().sort((a, b) => b.comment.length - a.comment.length),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = () => {
    travelService
      .post("/auth/login", {
        email: "mfathulqorib97@gmail.com",
        password: "password",
      })
      .then(() => {
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // decode token
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExNjYyODRhLTNlNjUtNGI0MS05ZWIzLWFmMDJlMjIyMDVkMyIsInVzZXJuYW1lIjoibWFya28iLCJuYW1lIjoibWFya28gZWZlbmRpIiwiYmlvIjoic29sbyB0cmF2ZWxsZXIiLCJlbWFpbCI6ImRva3RlcmZhcm1hMDAxQGdtYWlsLmNvbSIsImF2YXRhciI6IiIsInJvbGVJZCI6ImRldmNyM3ctNDUtdTUzciIsImlhdCI6MTcwMzgzOTUwMCwiZXhwIjoxNzA0NDQ0MzAwfQ.jdoOLTQZvPsQ_aW0qL7hpWj5eVKbzhPgPePc-_BAfqc";
  // const payload = verify(token, SECRET_KEY);
  // const name = payload.name;
  // console.log(token);

  // console.log("ini payload >>", payload);
  // console.log("ini payload.name >>", name);

  useEffect(() => {
    initData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        setKeyword,
        handleLogin,
        keyword,
        affordableDestination: Search(
          affordableDestination,
          querySearch,
          keyword,
        ),
        topRateDestination: Search(topRateDestination, querySearch, keyword),
        trendingDestination: Search(trendingDestination, querySearch, keyword),
        // name,
        // username,
      }}
    >
      <NextUIProvider>
        <Toaster />
        <div>{children}</div>
      </NextUIProvider>
    </AppContext.Provider>
  );
};
