"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { Location } from "@/types";

// Fix Leaflet default marker icon issue
const defaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

interface LocationComponentProps {
  location: Location;
}

const RecenterMap: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap();
  
  useEffect(() => {
    console.log("RecenterMap - Current position:", position);
    map.setView(position, map.getZoom());
  }, [position, map]);
  
  return null;
};

const LocationComponent: React.FC<LocationComponentProps> = ({ location }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Validate location data
    if (!location) {
      setError("Location data is missing");
      return;
    }

    if (typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
      setError("Invalid coordinates");
      return;
    }

    if (location.latitude < -90 || location.latitude > 90 || 
        location.longitude < -180 || location.longitude > 180) {
      setError("Coordinates out of valid range");
      return;
    }

    console.log("Location data:", location);
  }, [location]);

  const openMap = () => {
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const mapUrl = isApple
      ? `https://maps.apple.com/?q=${location.latitude},${location.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
    window.open(mapUrl, "_blank");
  };

  const position: [number, number] = [location.latitude, location.longitude];

  if (error) {
    return (
      <div className="w-full h-96 bg-red-100 rounded-lg flex items-center justify-center p-4">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!isMounted) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-8 w-2/3 mx-auto">
      {/* Left: Map */}
      <div className="w-full h-96 rounded-lg overflow-hidden relative">
        {isMounted && (
          <MapContainer 
            center={position} 
            zoom={13} 
            scrollWheelZoom={false} 
            className="w-full h-full"
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} />
            <RecenterMap position={position} />
          </MapContainer>
        )}
        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded shadow text-sm">
          Coordinates: {position[0].toFixed(6)}, {position[1].toFixed(6)}
        </div>
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

export default LocationComponent;