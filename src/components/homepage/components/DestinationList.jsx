"use client";

import React, { useContext } from "react";
import { ReviewCard } from "./ReviewCard";
import { Header3 } from "./Header3";
import { AppContext } from "@/components/providers";
import {
  AFFORDABLE_DESTINATION,
  AFFORDABLE_DESTINATION_HEADER_TEXT,
  TOP_RATED_DESTINATION,
  TOP_RATED_DESTINATION_HEADER_TEXT,
  TRENDING_DESTINATION,
  TRENDING_DESTINATION_HEADER_TEXT,
} from "@/utils/constants";
import { DestinationListLoader } from "./DestinationListLoader";

export const DestinationList = ({ type }) => {
  const {
    topRateDestination,
    trendingDestination,
    affordableDestination,
    isLoading,
  } = useContext(AppContext);

  const renderReviewCards = () => {
    let headerText = "";
    let destinations = [];

    switch (type) {
      case TOP_RATED_DESTINATION:
        headerText = TOP_RATED_DESTINATION_HEADER_TEXT;
        destinations = topRateDestination;
        break;
      case TRENDING_DESTINATION:
        headerText = TRENDING_DESTINATION_HEADER_TEXT;
        destinations = trendingDestination;
        break;
      case AFFORDABLE_DESTINATION:
        headerText = AFFORDABLE_DESTINATION_HEADER_TEXT;
        destinations = affordableDestination;
        break;
      default:
        break;
    }

    return (
      <>
        <Header3 text={headerText} />
        <section className="mt-2 flex h-[290px] w-full gap-3 overflow-x-auto px-1 py-2 sm:h-[370px] sm:gap-5">
          {/* <DestinationListLoader /> */}
          {isLoading ? (
            <DestinationListLoader />
          ) : (
            destinations.map((item) => <ReviewCard item={item} key={item.id} />)
          )}
        </section>
      </>
    );
  };

  return (
    <main id="all-reviews" className="my-2 px-[5vw] py-2 sm:my-4 sm:px-[10vw]">
      {renderReviewCards()}
    </main>
  );
};
