"use client";

import { Card, useCheckbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CardMap from "./components/CardMap";
import Description from "./components/Description";
import InfoDestination from "./components/InfoDestination";
import TitleHero from "./components/TitleHero";
//import imageGallery
import ImageGallery from "react-image-gallery";

//import imageGallery CSS
import { imageUrl } from "@/config/apiUrl";
import "react-image-gallery/styles/css/image-gallery.css";
import Link from "next/link";
import useSnap from "./hooks/useSnap";
import useCheckout from "./hooks/useCheckout";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/ApiUrl";

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

  const { snapEmbed } = useSnap();
  const [snapShow, setSnapShow] = useState(false);
  const navigate = useRouter();

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
    console.log("tokensnap", response.data.snapToken);
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

  console.log({ snapShow });
  return (
    <div className="space-y-4 p-5">
      {!snapShow ? (
        <div>
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

          <button onClick={() => handleCheckout(postId)}>checkout</button>

          <Link href={`/destination/transactions/checkout/${postId}`}>
            <div>Book</div>
          </Link>
        </div>
      ) : (
        <div>
          {snapShow}
          <div id="snap-container"></div>
        </div>
      )}
    </div>
  );
};
