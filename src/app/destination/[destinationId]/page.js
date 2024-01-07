import { DetailDestination } from "@/components/destination/DetailDestination";
import { API_URL, SECRET_KEY } from "@/utils/ApiUrl";
import { jwtExtract } from "@/utils/jwtExtract";
import { cookies } from "next/headers";

const getDetailPost = async (postId) => {
  try {
    const res = await fetch(`${API_URL}/posts?id=${postId}`);
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default async function page({ params }) {
  const { destinationId } = params;
  const { data } = await getDetailPost(destinationId);
  const cookieStore = cookies();
  const token = cookieStore.get("token").value;
  const payload = jwtExtract(token, SECRET_KEY);
  const { id } = payload;
  return (
    <div className="px-[5vw] pt-[50px] sm:px-[10vw] sm:pt-[60px]">
      <DetailDestination userId={id} data={data} postId={destinationId} />
    </div>
  );
}
