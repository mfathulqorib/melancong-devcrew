"use client";

import { travelService } from "@/services/TravelService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useRegister = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();

    const username = event.target.username.value || "";
    const name = event.target.name.value || "";
    const email = event.target.email.value || "";
    const bio = event.target.bio.value || "";
    const password = event.target.password.value || "";
    const confirmPassword = event.target.confirmPassword.value || "";

    formData.append("username", username);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("password", password);

    // for (const value of formData.values()) {
    //   console.log(value);
    // }

    if (password !== confirmPassword) {
      setLoading(false);
      toast.error("Konfirmasi password tidak cocok");
      return;
    }

    travelService
      .post("/auth/register", formData)
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        toast.success(
          "Akun berhasil dibuat, link konfirmasi akun telah dikirimkan ke alamat email",
          { duration: 5000 },
        );
        // setTimeout(() => router.push("/login"), 5000);
        return;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.error);
        toast.error(`${error.response.data.error}`);
        return;
      });
  };
  return { handleRegister, isLoading };
};
