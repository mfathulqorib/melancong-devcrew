"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

//import mapbox gl direction
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

const Direction = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [longitude, setLongitude] = useState(110.7241664);
  const [latitude, setLatitude] = useState(-6.9515962);
  const mapContainer = useRef(null);

  useEffect(() => {
    // init map
    const map = new mapboxgl.Map({
      // fill from use reff current
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [searchParams.get("longitude"), searchParams.get("latitude")],
      zoom: 15,
    });

    // init geolocation(untuk mendapat kan lokasi kita saat ini)
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    });
    // Add geolocate control to the map.
    map.addControl(geolocate);

    //init directions
    const directions = new Directions({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      // UI controls
      controls: {
        inputs: false,
        instructions: true,
      },
    });

    // Add directions to the map.
    map.on("load", function () {
      geolocate.trigger(); //<- Automatically activates geolocation

      geolocate.on("geolocate", function (position) {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);

        //direction
        directions.setOrigin([
          position.coords.longitude,
          position.coords.latitude,
        ]);
      });

      directions.setDestination([
        searchParams.get("longitude"),
        searchParams.get("latitude"),
      ]);

      map.addControl(directions);
    });
  }, []);

  return (
    <div>
      <Card className="py-4">
        <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
          <p className="text-tiny font-bold uppercase">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="text-large font-bold">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <div
            ref={mapContainer}
            className="map-container"
            style={{ height: "400px" }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Direction;
