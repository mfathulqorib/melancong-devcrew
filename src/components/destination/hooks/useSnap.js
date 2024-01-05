"use client";

import { midtransClientKey } from "@/config/apiUrl";
import { useEffect, useState } from "react";

const useSnap = () => {
  const [snap, setSnap] = useState(null);
  useEffect(() => {
    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    console.log("my midtrans client key", myMidtransClientKey);
    const script = document.createElement("script");
    script.src = `https://app.sandbox.midtrans.com/snap/snap.js`;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.onload = () => {
      setSnap(window?.snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snapToken, embedId, action) => {
    if (snap) {
      snap.embed(snapToken, {
        embedId,
        onSuccess: function (result) {
          console.log("success", result);
          action.onSuccess(result);
        },
        onPending: function (result) {
          console.log("pending", result);
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    }
  };

  return { snapEmbed };
};
export default useSnap;
