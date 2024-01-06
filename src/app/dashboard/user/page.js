import { PerformaReview } from "@/components/myaccount/components/PerformaReview";
import { Reviews } from "@/components/myaccount/components/Reviews";
import { travelService } from "@/services/TravelService";
import { SECRET_KEY } from "@/utils/ApiUrl";
import { jwtExtract } from "@/utils/jwtExtract";
import { cookies } from "next/headers";
import React from "react";

export default async function page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token").value;
  const payload = jwtExtract(token, SECRET_KEY);
  const { id } = payload;
  const getReviews = async () => {
    try {
      const res = await travelService.get(`/comment?userId=${id}`);
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error) {}
  };
  const myReviews = await getReviews();

  return (
    <main className="min-h-[calc(100vh-50px)] px-[5vw] pt-[50px] sm:min-h-[calc(100vh-60px)] sm:px-[10vw] sm:pt-[60px]">
      <section className="mt-3 sm:mt-5">
        <h2 className="text-xl font-bold sm:text-2xl">Review Kamu</h2>
        <PerformaReview totalReviews={myReviews?.length || 0} />
      </section>
      <section className="mt-3 sm:mt-5">
        <Reviews myReviews={myReviews} />
      </section>
    </main>
  );
}
