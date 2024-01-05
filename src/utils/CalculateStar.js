import { HalfStar } from "@/components/homepage/components/icon/HalfStar";
import { Star } from "lucide-react";

export const calculateStars = (rating) => {
  const star = [];
  const fullStars = Math.floor(rating);

  for (let i = 0; i < fullStars; i++) {
    star.push(
      <Star fill="#FDB200" stroke="#FDB200" className="size-3 sm:size-4" />,
    );
  }

  if (rating % 2 !== 0 && rating !== 5) {
    star.push(<HalfStar fill="#FDB200" />);
  }

  const emptyStars = 5 - star.length;

  for (let i = 0; i < emptyStars; i++) {
    star.push(<Star stroke="#FDB200" className="size-3 sm:size-4" />);
  }
  return star;
};
