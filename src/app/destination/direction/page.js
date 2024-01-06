import { Header } from "@/components/Header";
import Direction from "@/components/destination/Direction";
import React from "react";

const DirectionDestination = () => {
  return (
    <div>
      <Header />
      <div className=" px-[5vw] pt-[50px] sm:px-[10vw] sm:pt-[60px]">
        <Direction />
      </div>
    </div>
  );
};

export default DirectionDestination;
