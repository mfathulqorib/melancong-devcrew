import { DetailDestination } from "@/components/destination/DetailDestination";
import React from "react";
import { apiUrl } from "@/config/apiUrl";

const getDetailPost = async (postId) => {
  try {
    const res = await fetch(`${apiUrl}/posts?id=${postId}`);
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }) => {
  const { destinationId } = params;
  const { data } = await getDetailPost(destinationId);
  console.log(data);
  return (
    <div>
      <DetailDestination data={data} postId={destinationId} />
    </div>
  );
};

export default page;
