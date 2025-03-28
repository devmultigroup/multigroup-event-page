"use client";
import React, { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { Location } from "@/types";
import { MapPin } from "@phosphor-icons/react";
import Heading from "./heading";

interface LocationComponentProps {
  location: Location;
}

const LocationComponent: React.FC<LocationComponentProps> = ({ location }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Validate location data
    if (!location) {
      setError("Location data is missing");
      return;
    }
    if (
      typeof location.latitude !== "number" ||
      typeof location.longitude !== "number"
    ) {
      setError("Invalid coordinates");
      return;
    }
    if (
      location.latitude < -90 ||
      location.latitude > 90 ||
      location.longitude < -180 ||
      location.longitude > 180
    ) {
      setError("Coordinates out of valid range");
      return;
    }
  }, [location]);

  const openMap = () => {
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const mapUrl = isApple
      ? `https://maps.apple.com/?q=${location.latitude},${location.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
    window.open(mapUrl, "_blank");
  };

  if (error) {
    return (
      <div className="w-full h-96 bg-red-100 rounded-lg flex items-center justify-center p-4">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-8 py-16 md:px-16 w-full lg:w-5/6 max-w-6xl md:w-5/6 mx-auto bg-[#BDF5F2] shadow-inset-all rounded-lg">
        {/* Left: Map */}
        <div className="w-full h-96 rounded-lg overflow-hidden relative shadow-lg">
          <Map
            height={384} // h-96 equals 384px
            defaultCenter={[location.latitude, location.longitude]}
            defaultZoom={13}
          >
            <Marker
              width={50}
              anchor={[location.latitude, location.longitude]}
            />
          </Map>
        </div>
        {/* Right: Event Info */}
        <div className="flex flex-col space-y-4 p-4">
          <p
            className="font-extrabold text-gray-900 text-4xl text-left  max-w-2xl"
            // style={{ fontFamily: "montserrat" }}
          >
            Konum
          </p>
          <h2 className="text-3xl font-bold">{location.name}</h2>
          <p className="text-lg text-gray-600">{location.subtext}</p>
          <button
            onClick={openMap}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 active:bg-orange-800 transition flex align-baseline justify-center gap-2"
          >
            <MapPin className="my-auto" />
            Haritada Aç
          </button>
        </div>
      </section>
    </div>
  );
};

export default LocationComponent;
