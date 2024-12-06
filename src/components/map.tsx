"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

export default function Map() {
  const havanaPosition: [number, number] = [23.1136, -82.3666]; // Latitude and Longitude of Havana

  return (
    <MapContainer
      center={havanaPosition}
      zoom={13}
      className="h-full w-full absolute top-0 left-0 z-0"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}
