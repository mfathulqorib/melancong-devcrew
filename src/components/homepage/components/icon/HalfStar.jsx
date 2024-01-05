import React from "react";

export const HalfStar = ({
  size,
  strokeWidth,
  fill,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 12}
    height="auto"
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill || "currentColor"}
    strokeWidth={strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-star-half"
    id="half-star"
  >
    <g fill="none" stroke={fill || "currentColor"}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      <polygon
        points="12 17.8 5.8 21 7 14.1 2 9.3 9 8.3 12 2"
        fill={fill || "currentColor"}
      />
    </g>
  </svg>
);
