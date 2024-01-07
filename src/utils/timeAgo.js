import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";

export const TimeAgo = ({ createdAt }) => {
  const parsedDate = parseISO(createdAt);
  const distance = formatDistanceToNow(parsedDate);

  return <span>{`${distance} ago`}</span>;
};

// // Example usage:
// const MyComponent = ({ createdAt }) => (
//   <div>
//     <p>
//       Posted: <TimeAgo createdAt={createdAt} />
//     </p>
//   </div>
// );
