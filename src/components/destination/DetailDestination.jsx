"use client";

import { Card } from "@nextui-org/react";
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

export const DetailDestination = ({ data, postId }) => {
  console.log("data", data);

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
  return (
    <div className="space-y-4">
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
    </div>
  );
};
