"use client";

import { NextUIProvider } from "@nextui-org/react";
import { createContext, useEffect, useState } from "react";
import { getAllPosts, travelService } from "@/services/TravelService";
import { Search } from "@/lib/Search";

export const AppContext = createContext();

export const Provider = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  const [affordableDestination, setAffordableDestination] = useState([]);
  const [topRateDestination, setTopRateDestination] = useState([]);
  const [trendingDestination, setTrendingDestination] = useState([]);
  const querySearch = ["city", "title"];

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

  useEffect(() => {
    initData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        setKeyword,
        keyword,
        affordableDestination: Search(
          affordableDestination,
          querySearch,
          keyword,
        ),
        topRateDestination: Search(topRateDestination, querySearch, keyword),
        trendingDestination: Search(trendingDestination, querySearch, keyword),
      }}
    >
      <NextUIProvider>
        <div>{children}</div>
      </NextUIProvider>
    </AppContext.Provider>
  );
};
