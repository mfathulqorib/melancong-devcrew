"use client";

import { Card, useCheckbox } from "@nextui-org/react";
import { useEffect } from "react";
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
  const { handleCheckout } = useCheckout();
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

      <button onClick={() => handleCheckout(postId)}>checkout</button>

      <Link href={`/destination/transactions/checkout/${postId}`}>
        <div>Book</div>
      </Link>
    </div>
  );
};
