import { HalfStar } from "@/components/homepage/components/icon/HalfStar";
import { Star } from "lucide-react";

export const calculateStars = (rating) => {
  const star = [];
  const fullStars = Math.floor(rating);

  for (let i = 0; i < fullStars; i++) {
    star.push(
      <Star
        fill="#FDB200"
        stroke="#FDB200"
        className="size-3 sm:size-4"
        size={16}
      />,
    );
  }

  if (rating % 2 !== 0 && rating !== 5) {
    console.log("ok");
    star.push(
      <HalfStar
        fill="#FDB200"
        // stroke="#FDB200"
        // className="size-3 sm:size-4"
        // size={16}
      />,
    );
  }

  const emptyStars = 5 - star.length;

  for (let i = 0; i < emptyStars; i++) {
    star.push(<Star stroke="#FDB200" className="size-3 sm:size-4" size={16} />);
  }
  console.log(star);
  return star;
};
