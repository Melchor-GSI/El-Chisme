"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { useLocationContext } from "@/store";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import CenterButton from "./map/CenterButton";
import { CenteredMarker } from "./map/CenterdMarker";

export default function Map() {
  const { state, dispatch } = useLocationContext();

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

      {state.locating ? (
        <>
          <CenterButton />
          <CenteredMarker />
        </>
      ) : (
        state.locations.map((locations) => (
          <Marker
            position={[locations.lat, locations.lng]}
            key={locations.id}
            eventHandlers={{
              click: () => {
                dispatch({ type: "SET_SELECTED_LOCATION", payload: locations });
              },
            }}
          />
        ))
      )}
    </MapContainer>
  );
}
