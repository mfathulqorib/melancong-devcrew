import { PerformaReview } from "@/components/myaccount/components/PerformaReview";
import { Reviews } from "@/components/myaccount/components/Reviews";
import React from "react";

export default function page() {
  return (
    <main className="min-h-[calc(100vh-50px)] px-[5vw] pt-[50px] sm:min-h-[calc(100vh-60px)] sm:px-[10vw] sm:pt-[60px]">
      <section className="mt-3 sm:mt-5">
        <h2 className="text-xl font-bold sm:text-2xl">Review Kamu</h2>
        <PerformaReview />
      </section>
      <section className="mt-3 sm:mt-5">
        <Reviews />
      </section>
    </main>
  );
}
