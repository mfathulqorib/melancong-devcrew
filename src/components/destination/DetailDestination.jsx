"use client";

import { Card } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CardMap from "./components/CardMap";
import Description from "./components/Description";
import InfoDestination from "./components/InfoDestination";
import TitleHero from "./components/TitleHero";
//import imageGallery
import ImageGallery from "react-image-gallery";

//import imageGallery CSS
import { imageUrl } from "@/config/apiUrl";
import { API_URL } from "@/utils/ApiUrl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "react-image-gallery/styles/css/image-gallery.css";
import useSnap from "./hooks/useSnap";

export const DetailDestination = ({ data, postId }) => {
  const images = [];

  const destinateImages = () => {
    // loop images from state
    for (let image in data?.postImage) {
      // push to images array

      images.push({
        original: `${imageUrl}/posts/${postId}/${data?.postImage[image].name}`,
        thumbnail: `${imageUrl}/posts/${postId}/${data?.postImage[image].name}`,
      });
    }
  };

  useEffect(() => {
    destinateImages();
  }, []);

  // const { snapEmbed } = useSnap();
  // const [snapShow, setSnapShow] = useState(false);
  // const navigate = useRouter();

  // const handleCheckout = async (postId) => {
  //   const response = await fetch(`${API_URL}/transactions`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       destinationId: postId,
  //     }),
  //   }).then((res) => res.json());

  //   console.log("responseeeeee", response);
  //   console.log("tokensnap", response.data.snapToken);
  //   if (response && response.status === "success") {
  //     // navigate(`/order-status?transaction_id=${response.data.id}`)
  //     setSnapShow(true);
  //     snapEmbed(response.data?.snapToken, "snap-container", {
  //       onSuccess: function (result) {
  //         console.log("success", result);
  //         navigate(`/order-status?transaction_id=${response.data.id}`);
  //         setSnapShow(false);
  //       },
  //       onPending: function (result) {
  //         console.log("pending", result);
  //         navigate(`/order-status?transaction_id=${response.data.id}`);
  //         setSnapShow(false);
  //       },
  //       onClose: function () {
  //         navigate(`/order-status?transaction_id=${response.data.id}`);
  //         setSnapShow(false);
  //       },
  //     });
  //   } else {
  //     console.log("error");
  //   }
  // };

  // console.log({ snapShow });

  // mode old
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = async (e) => {
    try {
      e.preventDefault();

      // const config = {
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      // };

      // const data = {
      //   destinationId: postId,

      // };

      // const body = JSON.stringify(data);

      // const response = await API.post('/transaction', body, config);

      const res = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destinationId: postId,
        }),
      });

      const response = await res.json();
      console.log("transaction success :", response);

      const token = response.data.snapToken;
      console.log({ token });
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log("transaction failed : ", error);
    }
  };
  return (
    <div className="space-y-4 p-5">
      {/* <CoverImages /> */}
      <ImageGallery items={images} showNav={false} autoPlay={true} />
      <div className=" box-border p-5 shadow-md ">
        <TitleHero
          title={data?.title}
          city={data?.city}
          address={data?.address}
        />
      </div>

      <Card className="rounded-none p-6 ">
        <InfoDestination
          address={data?.address}
          officeHours={data?.officeHours}
          price={data?.budget?.toLocaleString("ID")}
          title={data?.title}
        />
      </Card>

      <Card className="rounded-none p-6 ">
        <CardMap
          latitude={data?.latitude}
          longitude={data?.longitude}
          address={data?.address}
          title={data?.title}
        />
      </Card>
      <Card className="rounded-none p-6 ">
        <Description desc={data?.desc} />
      </Card>

      <button onClick={handleBuy}>checkout</button>
    </div>
  );
};
