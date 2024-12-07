import { useLocationContext } from "@/store";
import { LatLngLiteral } from "leaflet";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";

export function useMapCenter() {
  const { dispatch } = useLocationContext();
  const [center, setCenter] = useState<LatLngLiteral>({
    lat: 51.505,
    lng: -0.09,
  });

  const map = useMapEvents({
    move() {
      const { lat, lng } = map.getCenter();
      setCenter({ lat, lng });
      dispatch({ type: "SET_LOCATING_COORDS", payload: { lat, lng } });
    },
  });
  return center;
}
