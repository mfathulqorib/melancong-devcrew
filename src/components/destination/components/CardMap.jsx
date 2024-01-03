"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardHeader, CardFooter, Button } from "@nextui-org/react";

//import mapbox gl
import mapboxgl from "mapbox-gl";
import { MapPin } from "lucide-react";
import Link from "next/link";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

const CardMap = ({ latitude, longitude, address, title }) => {
  const mapContainer = useRef(null);

  const initMap = () => {
    const map = new mapboxgl.Map({
      // fill container from use reff current
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      // style: "mapbox://styles/mapbox/outdoors-v12",
      center: [longitude ? longitude : "", latitude ? latitude : ""],
      zoom: 15,
    });

    // make popup text
    new mapboxgl.Popup({
      closeOnClick: false,
    })
      .setLngLat([longitude ? longitude : "", latitude ? latitude : ""])
      .setHTML(`<h6>${title}</h6><hr/><p><i>${address}</i></p>`)
      // after we config popup - we must adding to map init
      .addTo(map);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div>
      <Card
        isFooterBlurred
        className="col-span-12 h-[300px] w-full sm:col-span-7"
      >
        <CardHeader className="absolute top-1 z-10 flex-col items-start">
          <p className="text-tiny font-bold uppercase">lOKASI</p>
        </CardHeader>
        {/* card body */}
        <div
          ref={mapContainer}
          className="h-[300px] w-full"
          style={{ height: "350px" }}
        />
        {/* end map */}
        <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 bg-black/40 dark:border-default-100">
          <div className="flex flex-grow items-center gap-2">
            <div>
              <MapPin className=" text-white/60 " />
            </div>
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">{title}</p>
              <p className="text-tiny text-white/60">{address}</p>
            </div>
          </div>
          <Link
            href={`/destination/direction?longitude=${longitude}&latitude=${latitude}`}
          >
            <Button radius="full" size="sm">
              Direction
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardMap;
