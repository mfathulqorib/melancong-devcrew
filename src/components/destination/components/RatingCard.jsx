import React from "react";

export const RatingCard = ({ rate }) => {
  return (
    <div className="row-span-1 flex gap-4 text-center">
      <div>{rate}/5</div>
      <div>
        <h3>Bagus</h3>
        <p>Dari 1064 Review</p>
      </div>
    </div>
  );
};
