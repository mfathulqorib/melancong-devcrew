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
  const [isLoading, setIsLoading] = useState(true);
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
      })
      .finally(() => {
        setIsLoading(false);
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
        router,
        affordableDestination: Search(
          affordableDestination,
          querySearch,
          keyword,
        ),
        topRateDestination: Search(topRateDestination, querySearch, keyword),
        trendingDestination: Search(trendingDestination, querySearch, keyword),
        isLoading,
      }}
    >
      <NextUIProvider>
        <Toaster />
        <div>{children}</div>
      </NextUIProvider>
    </AppContext.Provider>
  );
};
