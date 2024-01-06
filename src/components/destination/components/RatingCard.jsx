"use client";
import React from "react";

export const RatingCard = ({ rate }) => {
  let tagRate = "";
  if (rate >= 4) {
    tagRate = "Very Recommended";
  } else if (rate < 4 && rate > 3) {
    tagRate = "Recommended";
  } else {
    tagRate = "Not Recommended";
  }
  return (
    <div className="row-span-1 flex gap-4 text-center">
      <div className="text-3xl font-semibold text-black">
        {rate}
        <span className="text-lg text-slate-400">/5</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-black">{tagRate}</h3>
      </div>
    </div>
  );
};
