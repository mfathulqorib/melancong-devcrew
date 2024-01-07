"use client";
import { travelService } from "@/services/TravelService";
import { toastStyle } from "@/utils/toastStyle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useLogin = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = () => {
    setLoading(true);
    travelService
      .post("/auth/login", loginData)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          toast.success(response.data.message, toastStyle);
          router.push("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`${error?.response?.data?.error}`);
      });
  };

  return { isLoading, loginData, handleChange, handleLogin };
};
