"use client";

import { AppContext } from "@/components/providers";
import { travelService } from "@/services/TravelService";
import { useContext } from "react";

export const useLogout = () => {
  const { router } = useContext(AppContext);
  const handleLogout = () => {
    travelService
      .post("/auth/logout")
      .then(({ data }) => {
        console.log(data);
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { handleLogout };
};
