"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { useLocationContext } from "@/store";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const { state } = useLocationContext();

  const havanaPosition: [number, number] = [23.1136, -82.3666];

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

      {state.locations.map(({ store, id }) => (
        <Marker position={[store.lat, store.long]} key={id}>
          <Popup>{store.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
