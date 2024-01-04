import { API_URL } from "@/utils/ApiUrl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const useCheckout = () => {
  const [snapShow, setSnapShow] = useState(false);
  const navigate = useRouter;

  const handleCheckout = async (postId) => {
    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destinationId: postId,
      }),
    }).then((res) => res.json());

    console.log("responseeeeee", response);
    if (response && response.status === "success") {
      // navigate(`/order-status?transaction_id=${response.data.id}`)
      setSnapShow(true);
      snapEmbed(response.data.snapToken, "snap-container", {
        onSuccess: function (result) {
          console.log("success", result);
          navigate(`/order-status?transaction_id=${response.data.id}`);
          setSnapShow(false);
        },
        onPending: function (result) {
          console.log("pending", result);
          navigate(`/order-status?transaction_id=${response.data.id}`);
          setSnapShow(false);
        },
        onClose: function () {
          navigate(`/order-status?transaction_id=${response.data.id}`);
          setSnapShow(false);
        },
      });
    } else {
      console.log("error");
    }
  };

  return { handleCheckout, snapShow };
};

export default useCheckout;
