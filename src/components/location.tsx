import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface LocationProps {
  location: {
    latitude: number;
    longitude: number;
    name: string;
    subtext: string;
  };
}

const Location: React.FC<LocationProps> = ({ location }) => {
  const openMap = () => {
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const mapUrl = isApple
      ? `https://maps.apple.com/?q=${location.latitude},${location.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
    window.open(mapUrl, "_blank");
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-8 w-2/3 mx-auto">
      {/* Left: Map */}
      <div className="w-full h-96 rounded-lg overflow-hidden">
        <MapContainer
          center={{ lat: location.latitude, lng: location.longitude }}
          zoom={15}
          style={{ height: "100%", width: "100%" }}  // Ensuring map container takes full height
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={{ lat: location.latitude, lng: location.longitude }} />
        </MapContainer>
      </div>

      {/* Right: Event Info */}
      <div className="flex flex-col space-y-4">
        <h2 className="text-3xl font-bold">{location.name}</h2>
        <p className="text-lg text-gray-600">{location.subtext}</p>
        <button
          onClick={openMap}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Haritada Aç
        </button>
      </div>
    </section>
  );
};

export default Location;
