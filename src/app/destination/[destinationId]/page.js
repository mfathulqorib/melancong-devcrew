import { DetailDestination } from "@/components/destination/DetailDestination";
import { API_URL } from "@/utils/ApiUrl";

const getDetailPost = async (postId) => {
  try {
    const res = await fetch(`${API_URL}/posts?id=${postId}`, {
      cache: "no-store",
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }) => {
  const { destinationId } = params;
  const { data } = await getDetailPost(destinationId);
  return (
    <div className="pt-[50px] sm:px-[40vh] sm:pt-[60px]">
      <DetailDestination data={data} postId={destinationId} />
    </div>
  );
};

export default page;
