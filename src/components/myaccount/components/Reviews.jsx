import React from "react";
import { NoReview } from "@/components/myaccount/components/icon/NoReview";

export const Reviews = () => {
  return (
    <>
      <h3 className="text-lg font-semibold sm:text-xl">Kumpulan Review-mu</h3>
      <div>
        <div className="m-0 mx-auto w-fit">
          <NoReview />
        </div>
        <div className="mt-[-20px] text-center sm:mt-0">
          <p className=" text-lg font-semibold sm:text-xl">
            Belum ada review darimu, nih
          </p>
          <p className="mt-2 text-base sm:text-lg">
            Jangan lupa berikan review untuk destinasi yang pernah kamu
            kunjungi, ya!
          </p>
        </div>
      </div>
    </>
  );
};
